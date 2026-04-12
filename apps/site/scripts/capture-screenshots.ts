#!/usr/bin/env npx tsx
/**
 * Screenshot Capture Script
 *
 * Uses Playwright to capture screenshots of static HTML mockup pages.
 * Produces optimized JPEG images for embedding in blog posts.
 *
 * Usage:
 *   npx tsx scripts/capture-screenshots.ts          # capture all mockups
 *   npx tsx scripts/capture-screenshots.ts --page task-board  # capture one
 *   npx tsx scripts/capture-screenshots.ts --dry-run # list pages only
 */

import * as fs from 'fs';
import * as path from 'path';
import { chromium } from '@playwright/test';

const SITE_ROOT = path.resolve(__dirname, '..');
const MOCKUP_DIR = path.join(SITE_ROOT, 'scripts', 'mockups');
const OUTPUT_DIR = path.join(SITE_ROOT, 'public', 'blog', 'screenshots');

interface CaptureConfig {
  /** HTML file name (without extension) */
  page: string;
  /** Viewport width */
  width: number;
  /** Viewport height */
  height: number;
  /** Output filename suffix (appended after page name) */
  suffix?: string;
}

const CAPTURES: CaptureConfig[] = [
  // Full-width captures (landscape — for full layout screenshots)
  { page: 'task-board', width: 1440, height: 900 },
  { page: 'dashboard', width: 1440, height: 900 },
  { page: 'agent-config', width: 1440, height: 900 },
  { page: 'cost-tracking', width: 1440, height: 900 },
  { page: 'code-review', width: 1440, height: 900 },
  { page: 'memory-system', width: 1440, height: 900 },
];

async function processImage(
  rawBuffer: Buffer,
  outputPath: string,
  maxWidth: number,
): Promise<{ sizeKB: number }> {
  const sharp = (await import('sharp')).default;

  let quality = 85;
  let outputBuffer = await sharp(rawBuffer)
    .resize(maxWidth, null, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();

  // Iteratively reduce quality if over 200KB
  while (outputBuffer.length > 200 * 1024 && quality > 50) {
    quality -= 5;
    outputBuffer = await sharp(rawBuffer)
      .resize(maxWidth, null, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();
  }

  fs.writeFileSync(outputPath, outputBuffer);
  return { sizeKB: Math.round(outputBuffer.length / 1024) };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const pageIdx = args.indexOf('--page');
  const targetPage = pageIdx !== -1 ? args[pageIdx + 1] : null;

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let captures = CAPTURES;
  if (targetPage) {
    captures = captures.filter((c) => c.page === targetPage);
    if (captures.length === 0) {
      console.error(`No captures found for page: ${targetPage}`);
      console.error(`Available pages: ${CAPTURES.map((c) => c.page).join(', ')}`);
      process.exit(1);
    }
  }

  if (dryRun) {
    console.log('Dry run — would capture:');
    for (const c of captures) {
      const suffix = c.suffix ? `-${c.suffix}` : '';
      console.log(`  ${c.page}${suffix}.jpg (${c.width}x${c.height})`);
    }
    return;
  }

  console.log(`\nCapturing ${captures.length} screenshot(s)...\n`);

  const browser = await chromium.launch();
  const results: { name: string; sizeKB: number }[] = [];
  const errors: { name: string; error: string }[] = [];

  for (const c of captures) {
    const suffix = c.suffix ? `-${c.suffix}` : '';
    const name = `${c.page}${suffix}`;
    const htmlPath = path.join(MOCKUP_DIR, `${c.page}.html`);

    if (!fs.existsSync(htmlPath)) {
      console.log(`  [SKIP] ${name} — ${c.page}.html not found`);
      errors.push({ name, error: 'HTML file not found' });
      continue;
    }

    console.log(`  [${name}]`);

    try {
      const context = await browser.newContext({
        viewport: { width: c.width, height: c.height },
        deviceScaleFactor: 2, // Retina quality
      });
      const page = await context.newPage();

      await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
      // Small delay for fonts to load
      await page.waitForTimeout(1000);

      const rawBuffer = await page.screenshot({ type: 'png', fullPage: false });
      const outputPath = path.join(OUTPUT_DIR, `${name}.jpg`);
      const { sizeKB } = await processImage(Buffer.from(rawBuffer), outputPath, 1200);

      console.log(`    Saved: ${name}.jpg (${sizeKB}KB)`);
      results.push({ name, sizeKB });

      await context.close();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`    ERROR: ${message}`);
      errors.push({ name, error: message });
    }
  }

  await browser.close();

  // Summary
  console.log('\n=== Summary ===');
  console.log(`Captured: ${results.length}/${captures.length}`);
  if (errors.length > 0) {
    console.log(`Errors: ${errors.length}`);
    for (const e of errors) {
      console.log(`  - ${e.name}: ${e.error}`);
    }
  }
  if (results.length > 0) {
    const totalKB = results.reduce((sum, r) => sum + r.sizeKB, 0);
    console.log(`Total size: ${totalKB}KB (avg ${Math.round(totalKB / results.length)}KB/image)`);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
