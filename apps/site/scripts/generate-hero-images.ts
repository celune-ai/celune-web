#!/usr/bin/env npx tsx
/**
 * Blog Hero Image Generator
 *
 * Generates abstract watercolor-style hero images for blog posts
 * using FLUX 1.1 Pro via Replicate.
 *
 * Usage:
 *   npx tsx scripts/generate-hero-images.ts                    # generate missing images
 *   npx tsx scripts/generate-hero-images.ts --all              # generate all (skip existing)
 *   npx tsx scripts/generate-hero-images.ts --slug <slug>      # generate for one post
 *   npx tsx scripts/generate-hero-images.ts --regenerate <slug> # force-regenerate one
 *   npx tsx scripts/generate-hero-images.ts --dry-run           # preview prompts only
 */

import * as fs from 'fs';
import * as path from 'path';
import { buildPrompt, getAllSlugs, IMAGE_CONFIG } from './hero-image-config';

const SITE_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(SITE_ROOT, IMAGE_CONFIG.outputDir);

// ---------------------------------------------------------------------------
// Replicate API
// ---------------------------------------------------------------------------

interface ReplicatePrediction {
  id: string;
  status: string;
  output?: string | string[];
  error?: string;
}

async function callReplicate(prompt: string): Promise<Buffer> {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    throw new Error(
      'REPLICATE_API_TOKEN not set. Add it to apps/site/.env.local',
    );
  }

  console.log('  Creating prediction...');
  const createRes = await fetch(
    `https://api.replicate.com/v1/models/${IMAGE_CONFIG.model}/predictions`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Prefer: 'wait',
      },
      body: JSON.stringify({
        input: {
          prompt,
          width: IMAGE_CONFIG.width,
          height: IMAGE_CONFIG.height,
          output_format: 'jpg',
          output_quality: IMAGE_CONFIG.jpegQuality,
          safety_tolerance: 5,
          prompt_upsampling: true,
        },
      }),
    },
  );

  if (!createRes.ok) {
    const text = await createRes.text();
    throw new Error(`Replicate API error (${createRes.status}): ${text}`);
  }

  let prediction: ReplicatePrediction = await createRes.json();

  // Poll if not using the Prefer: wait header or if still processing
  while (prediction.status === 'starting' || prediction.status === 'processing') {
    console.log(`  Status: ${prediction.status}...`);
    await new Promise((r) => setTimeout(r, 2000));

    const pollRes = await fetch(
      `https://api.replicate.com/v1/predictions/${prediction.id}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    prediction = await pollRes.json();
  }

  if (prediction.status === 'failed') {
    throw new Error(`Prediction failed: ${prediction.error}`);
  }

  const imageUrl = Array.isArray(prediction.output)
    ? prediction.output[0]
    : prediction.output;

  if (!imageUrl) {
    throw new Error('No image URL in prediction output');
  }

  console.log('  Downloading image...');
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) throw new Error(`Failed to download image: ${imgRes.status}`);

  return Buffer.from(await imgRes.arrayBuffer());
}

// ---------------------------------------------------------------------------
// Post-processing with Sharp
// ---------------------------------------------------------------------------

async function processImage(
  rawBuffer: Buffer,
  slug: string,
): Promise<{ filePath: string; sizeKB: number }> {
  // Dynamic import so the script doesn't fail if sharp isn't installed yet
  const sharp = (await import('sharp')).default;

  const outPath = path.join(OUTPUT_DIR, `${slug}.jpg`);

  // Resize to target dimensions and compress
  let quality = IMAGE_CONFIG.jpegQuality;
  let outputBuffer: Buffer;

  // First pass — target quality
  outputBuffer = await sharp(rawBuffer)
    .resize(IMAGE_CONFIG.width, IMAGE_CONFIG.height, { fit: 'cover' })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();

  // If over max file size, reduce quality iteratively
  while (outputBuffer.length > IMAGE_CONFIG.maxFileSize && quality > 50) {
    quality -= 5;
    outputBuffer = await sharp(rawBuffer)
      .resize(IMAGE_CONFIG.width, IMAGE_CONFIG.height, { fit: 'cover' })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();
  }

  fs.writeFileSync(outPath, outputBuffer);
  const sizeKB = Math.round(outputBuffer.length / 1024);

  return { filePath: outPath, sizeKB };
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const generateAll = args.includes('--all');
  const regenerateIdx = args.indexOf('--regenerate');
  const slugIdx = args.indexOf('--slug');

  // Load .env.local
  const envPath = path.join(SITE_ROOT, '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    for (const line of envContent.split('\n')) {
      const match = line.match(/^([A-Z_]+)=(.+)$/);
      if (match) {
        process.env[match[1]] = match[2].trim();
      }
    }
  }

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let slugs: string[];

  if (regenerateIdx !== -1) {
    const slug = args[regenerateIdx + 1];
    if (!slug) {
      console.error('Usage: --regenerate <slug>');
      process.exit(1);
    }
    slugs = [slug];
    // Delete existing to force regeneration
    const existing = path.join(OUTPUT_DIR, `${slug}.jpg`);
    if (fs.existsSync(existing)) fs.unlinkSync(existing);
  } else if (slugIdx !== -1) {
    const slug = args[slugIdx + 1];
    if (!slug) {
      console.error('Usage: --slug <slug>');
      process.exit(1);
    }
    slugs = [slug];
  } else {
    slugs = getAllSlugs();
  }

  // Filter to only missing images (unless --all or --regenerate)
  if (!generateAll && regenerateIdx === -1) {
    slugs = slugs.filter((slug) => {
      const exists = fs.existsSync(path.join(OUTPUT_DIR, `${slug}.jpg`));
      if (exists) console.log(`  Skipping ${slug} (already exists)`);
      return !exists;
    });
  }

  if (slugs.length === 0) {
    console.log('All images already exist. Use --regenerate <slug> to recreate one.');
    return;
  }

  console.log(`\nGenerating ${slugs.length} hero image(s)...\n`);

  const results: { slug: string; sizeKB: number; prompt: string }[] = [];
  const errors: { slug: string; error: string }[] = [];

  for (const slug of slugs) {
    const prompt = buildPrompt(slug);

    console.log(`[${slug}]`);

    if (dryRun) {
      console.log(`  Prompt: ${prompt}\n`);
      results.push({ slug, sizeKB: 0, prompt });
      continue;
    }

    try {
      const rawBuffer = await callReplicate(prompt);
      const { sizeKB } = await processImage(rawBuffer, slug);
      console.log(`  Saved: public/blog/${slug}.jpg (${sizeKB}KB)\n`);
      results.push({ slug, sizeKB, prompt });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`  ERROR: ${message}\n`);
      errors.push({ slug, error: message });
    }
  }

  // Summary
  console.log('\n=== Summary ===');
  console.log(`Generated: ${results.length}/${slugs.length}`);
  if (errors.length > 0) {
    console.log(`Errors: ${errors.length}`);
    for (const e of errors) {
      console.log(`  - ${e.slug}: ${e.error}`);
    }
  }
  if (!dryRun && results.length > 0) {
    const totalKB = results.reduce((sum, r) => sum + r.sizeKB, 0);
    console.log(`Total size: ${totalKB}KB (avg ${Math.round(totalKB / results.length)}KB/image)`);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
