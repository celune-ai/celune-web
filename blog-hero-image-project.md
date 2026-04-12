# Blog Hero Image Generation

**Project ID:** `0e86219e-19da-4613-afef-06919992c2c8`
**Status:** active | **Type:** feature | **Category:** design
**Created:** 2026-03-15

> Build an AI-powered pipeline to generate unique, abstract watercolor-style hero images for blog posts. Branded to Celune (dark backgrounds, emerald green tones). Uses Anthropic Claude image generation as primary API. Replaces placeholder og-image.jpg with unique per-post artwork.

---

## PRD

## Problem Statement

Every blog post on celune.ai currently uses the same placeholder hero image (og-image.jpg). This creates a monotonous visual experience on the blog index, hurts social media engagement (identical OG images across all shares), and undermines the premium, design-forward brand Celune is building.

## Research & Discovery

### User Insights

- Blog hero images are the first visual touchpoint when sharing articles on Twitter/LinkedIn
- Identical OG images across posts reduce click-through rates
- Abstract imagery (vs. content-specific) creates a consistent, recognizable brand pattern while being faster to generate
- Watercolor-style art conveys creativity and artistry, differentiating from typical tech blog stock imagery

### Competitive Landscape

- fin.ai/research: Uses refined, professional imagery with blues/teals, minimal palette
- Vercel blog: Uses branded illustrations with consistent design language
- Littlebird.ai: Clean geometric UI mockups, gradient-based illustrations

### Technical Landscape

- Anthropic Claude: Supports image generation via the Messages API
- OpenAI DALL-E 3: Strong abstract/artistic output, REST API
- Stability AI: Good for artistic styles via Replicate
- Replicate: Marketplace of models including watercolor-specific fine-tunes
- Nanobanana2: User's existing tool that produces good watercolor results

## Goals

1. Generate unique, abstract watercolor-style hero images for every blog post
2. Establish a consistent visual brand: dark backgrounds, emerald green tones, watercolor textures
3. Build a reusable generation pipeline that can produce images for new posts automatically
4. Improve social media engagement with distinct, visually compelling OG images
5. Replace all placeholder og-image.jpg references with unique per-post images

## Non-Goals

- Content-specific imagery (no illustrations of the article topic)
- Real-time/dynamic image generation
- Custom illustrations or hand-drawn art
- Video thumbnails or animated content

## Edge Cases & Failure Modes

- API rate limits when batch-generating for existing 10 posts
- Inconsistent output quality requiring curation step
- Color consistency enforcement for Celune brand palette
- Image dimensions must work at both 16:9 (hero) and 2.4:1 (OG card) aspect ratios
- Fallback to og-image.jpg if generation fails
- Cost monitoring per-image

## Requirements

### Functional

1. Image generation script that produces watercolor-style abstract images with Celune branding
2. Prompt engineering system with tested prompts that produce consistent results
3. Per-post image storage in /public/blog/ with slug-based naming
4. Updated blog registry (blog.ts) to reference unique images per post
5. Build-time or CLI generation workflow (not runtime)
6. Image optimization pipeline (compress to web-appropriate sizes)

### Non-Functional

1. Generated images must be under 200KB each after optimization
2. Images must render correctly at 1200x630 (OG), 16:9 (hero), and 2.4:1 (featured card)
3. Generation should complete in under 60 seconds per image
4. Pipeline must be idempotent

### User Stories

- As a blog reader, I see a unique, beautiful watercolor hero image on each post
- As a social media user, I see a distinctive branded image when a Celune article is shared
- As a content author, I can generate a hero image for a new post with a single CLI command

## Design Direction

Style: Abstract watercolor with organic textures, paint-bleed effects, and flowing forms
Palette: Dark backgrounds (#08080a to #1a1a2e), emerald/green accents (#22c55e, #16a34a, #86efac), subtle warm highlights
Composition: Centered or asymmetric abstract forms, negative space, no text overlay
Mood: Premium, artistic, slightly mysterious
Consistency: Every image should feel like part of the same collection while being unique

## Technical Approach

### Recommended Architecture

1. Generator script (scripts/generate-hero-images.ts): CLI tool that takes a blog slug and generates an image
2. Prompt template: Parameterized prompt with consistent style directives + per-image variation
3. API integration: FLUX 1.1 Pro via Replicate (primary — best quality, LoRA fine-tune path), DALL-E 3 (fallback — easiest integration). Note: Anthropic Claude does NOT support image generation.
4. Post-processing: Sharp.js for resizing, compression, and format conversion
5. Storage: Static files in /public/blog/slug.jpg committed to repo for SSG
6. Registry update: Script auto-updates blog.ts heroImage paths after generation
7. Future: Train a FLUX Dev LoRA on Celune brand reference images for maximum consistency

## Open Questions & Decisions

| #   | Question                                                             | Owner | Status        |
| --- | -------------------------------------------------------------------- | ----- | ------------- |
| 1   | Does Anthropic image gen produce high enough quality watercolor art? | RICK  | Needs testing |
| 2   | Should we generate at 1200x630 or higher and downscale?              | RICK  | Needs testing |
| 3   | Seed/variation system for deterministic per-post images?             | Eric  | Open          |
| 4   | Store in repo or CDN (Vercel Blob)?                                  | Eric  | Leaning repo  |
| 5   | Budget cap per image generation?                                     | Eric  | Open          |

## Success Metrics

1. Every blog post has a unique hero image (0 posts using placeholder)
2. Social media card previews show distinct, on-brand images
3. Blog index page has visual variety and feels premium
4. Image generation takes < 60s per image
5. All generated images are < 200KB compressed

---

## Task Overview

| #   | Sprint | Task                                             | Priority | Assignee | Status | ID         |
| --- | ------ | ------------------------------------------------ | -------- | -------- | ------ | ---------- |
| 0   | 0      | Create a PRD                                     | high     | sage     | done   | `f260e6e7` |
| 1   | 1      | Research and test image generation APIs          | high     | rick     | inbox  | `a2426afb` |
| 2   | 2      | Design prompt template system                    | high     | rick     | inbox  | `89979e7d` |
| 3   | 3      | Build image generation CLI script                | high     | rick     | inbox  | `41dafc9a` |
| 4   | 3      | Add image post-processing pipeline               | normal   | rick     | inbox  | `6d75dd0c` |
| 5   | 4      | Generate hero images for all existing blog posts | high     | rick     | inbox  | `a2840f63` |
| 6   | 4      | Update blog registry with generated image paths  | high     | rick     | inbox  | `833da054` |
| 7   | 5      | Code review and QA                               | high     | scan     | inbox  | `f9e06dd0` |
| 8   | 5      | Design feedback                                  | high     | noir     | inbox  | `b6064122` |
| 9   | 5      | Project retrospective                            | normal   | sage     | inbox  | `f618dbaa` |

---

## Task Details

### Task 0: Create a PRD

- **ID:** `f260e6e7-feb6-492b-aeb2-3b19ce3c7500`
- **Sprint:** 0
- **Priority:** high
- **Assignee:** sage
- **Status:** done
- **Outcome:** PRD was created during project setup with research from fin.ai, littlebird.ai, and user-provided watercolor inspiration images.

## What

Produce a Product Requirements Document for the Blog Hero Image Generation project.

## Approach

1. Research image generation APIs and inspiration sites
2. Synthesize into structured PRD
3. Upload to project

## Blockers

None.

---

### Task 1: Research and test image generation APIs

- **ID:** `a2426afb-e51e-43ea-b5dd-8467905a43f9`
- **Sprint:** 1
- **Priority:** high
- **Assignee:** rick
- **Status:** inbox

## What

Spike to evaluate Anthropic Claude image generation, DALL-E 3, and Replicate for producing abstract watercolor-style images with Celune branding. Produce 3-5 test images from each viable API.

## Value

Determines the best API before building the full pipeline. Avoids committing to an API that can't produce the right aesthetic.

## Approach

1. Test Anthropic Claude Messages API with image generation — generate 3 watercolor test images with dark bg + emerald tones
2. Test DALL-E 3 API with the same prompts for comparison
3. Test 1-2 Replicate watercolor models (e.g., stable-diffusion with watercolor LoRA)
4. Compare output quality, consistency, cost, and generation speed
5. Document findings with sample images and recommended API choice
6. Test prompt variations to find the sweet spot for abstract watercolor + Celune branding

## Sequence

No dependencies — can start immediately.

## Blockers

None — RICK has API keys for Anthropic and can test immediately.

---

### Task 2: Design prompt template system

- **ID:** `89979e7d-8364-4d75-b00d-597f0d66c6d9`
- **Sprint:** 2
- **Priority:** high
- **Assignee:** rick
- **Status:** inbox

## What

Create a parameterized prompt template that produces consistent abstract watercolor hero images branded to Celune. Include a variation system so each post gets a unique image while maintaining collection cohesion.

## Value

A well-engineered prompt template is the key to consistent, high-quality output. Without it, each generation is a gamble.

## Approach

1. Based on API spike results, define the base prompt structure (style directives, color palette, composition rules)
2. Create variation parameters: color emphasis (emerald/teal/sage), shape vocabulary (flowing/geometric/organic), texture intensity
3. Build a prompt template function that takes a slug/seed and returns a unique but on-brand prompt
4. Test 10+ variations to ensure consistency across the collection
5. Document the prompt template with examples of good and bad outputs
6. Store prompts in a config file for easy iteration

## Sequence

Depends on: API research spike (Sprint 1) — need to know which API to optimize prompts for.

## Blockers

None — ready after Sprint 1.

---

### Task 3: Build image generation CLI script

- **ID:** `41dafc9a-86c6-487a-be8e-5775c37af09e`
- **Sprint:** 3
- **Priority:** high
- **Assignee:** rick
- **Status:** inbox

## What

Create a TypeScript CLI script (`scripts/generate-hero-images.ts`) that generates watercolor hero images for blog posts using the chosen API and prompt template.

## Value

The core pipeline — enables one-command image generation for any blog post, existing or new.

## Approach

1. Create `scripts/generate-hero-images.ts` with commands:
   - `generate --slug <slug>` — generate image for a single post
   - `generate --all` — generate images for all posts missing hero images
   - `generate --regenerate <slug>` — force-regenerate a specific post's image
2. Integrate the chosen image generation API (from Sprint 1 spike)
3. Use the prompt template system (from Sprint 2)
4. Save raw generated images to a temp directory
5. Add progress logging and error handling
6. Support --dry-run to preview prompts without generating

## Sequence

Depends on: Prompt template system (Sprint 2).

## Blockers

None — ready after Sprint 2.

---

### Task 4: Add image post-processing pipeline

- **ID:** `6d75dd0c-dafa-4995-b55c-8d11a50a821d`
- **Sprint:** 3
- **Priority:** normal
- **Assignee:** rick
- **Status:** inbox

## What

Add Sharp.js post-processing to the generation script: resize to multiple dimensions (OG 1200x630, hero 16:9), compress, convert to optimized JPEG/WebP, and save to `/public/blog/`.

## Value

Ensures generated images are web-optimized, load fast, and work correctly in all contexts (hero, OG card, featured card).

## Approach

1. Add sharp as a dev dependency
2. After image generation, pipe through Sharp:
   - Resize to 1200x630 for OG cards
   - Resize to 1920x1080 for high-res hero display
   - Compress to target < 200KB per image
   - Output as JPEG with quality 85 (good balance of quality and size)
3. Save processed images to `/public/blog/{slug}.jpg`
4. Generate a WebP variant alongside JPEG for modern browsers
5. Add size reporting to CLI output

## Sequence

Depends on: CLI script (Sprint 3) — extends the generation pipeline.

## Blockers

None — ready after Sprint 3.

---

### Task 5: Generate hero images for all existing blog posts

- **ID:** `a2840f63-7cb7-47c9-aa04-c6da9b36c7a4`
- **Sprint:** 4
- **Priority:** high
- **Assignee:** rick
- **Status:** inbox

## What

Run the generation pipeline to produce unique watercolor hero images for all 10 existing blog posts. Curate output, regenerate any that don't meet quality bar.

## Value

The visible payoff — transforms the blog from identical placeholder images to a visually stunning, branded collection.

## Approach

1. Run `generate --all` to produce images for all 10 posts
2. Review each generated image for quality, brand consistency, and aesthetic appeal
3. Regenerate any that don't meet the bar (wrong colors, too busy, too plain)
4. Ensure the collection feels cohesive — no outliers
5. Optimize all final images through the post-processing pipeline
6. Commit generated images to the repo

## Sequence

Depends on: Post-processing pipeline (Sprint 3).

## Blockers

None — ready after Sprint 3 is complete.

---

### Task 6: Update blog registry with generated image paths

- **ID:** `833da054-9b3a-46d2-bbdd-61ce4dffd654`
- **Sprint:** 4
- **Priority:** high
- **Assignee:** rick
- **Status:** inbox

## What

Update `apps/site/src/lib/blog.ts` to replace all `/og-image.jpg` placeholder references with the actual per-post hero image paths. Update Next.js config if needed for image optimization.

## Value

Connects the generated images to the blog pages — makes them visible to users and social media scrapers.

## Approach

1. Update each post in the blog registry: `heroImage: '/blog/{slug}.jpg'`
2. Verify Next.js Image component handles the new paths correctly
3. Check `next.config.ts` — add image size configuration if needed
4. Test OG meta tags render correct image URLs
5. Test social card previews (Twitter Card Validator, Facebook Debugger)
6. Verify blog index cards show unique hero images
7. Verify blog post pages show correct hero images

## Sequence

Depends on: Generated images (Sprint 4).

## Blockers

None — ready after images are generated.

---

### Task 7: Code review and QA

- **ID:** `f9e06dd0-bdb0-4abd-bb0f-3fbe88a2a4e1`
- **Sprint:** 5
- **Priority:** high
- **Assignee:** scan
- **Status:** inbox
- **Depends on:** Research and test image generation APIs (`a2426afb`), Design prompt template system (`89979e7d`), Build image generation CLI script (`41dafc9a`), Add image post-processing pipeline (`6d75dd0c`), Generate hero images for all existing blog posts (`a2840f63`), Update blog registry with generated image paths (`833da054`)

## What

Comprehensive code review and quality assurance pass across all changes in this project.

## Approach

1. Review every PR/commit for correctness, security, and code quality.
2. Run full test suite.
3. Manual QA of image generation pipeline.
4. Verify generated images meet quality bar.
5. Check no hardcoded secrets or API keys committed.
6. Auto-create and execute fix tasks for issues found.

## Sequence

- Blocked by: all implementation tasks
- Must complete before: Design Feedback

## Blockers

None.

---

### Task 8: Design feedback

- **ID:** `b6064122-1ce4-4e4e-8e22-0507575a9ab3`
- **Sprint:** 5
- **Priority:** high
- **Assignee:** noir
- **Status:** inbox
- **Depends on:** Code review and QA (`f9e06dd0`)

## What

UX quality assurance pass reviewing all generated hero images and their integration with the blog UI.

## Approach

1. Review all generated images for visual quality, brand consistency, and aesthetic appeal.
2. Check images render correctly across all contexts: blog index cards, post hero, OG/social cards.
3. Verify responsive behavior — images scale properly on mobile/tablet/desktop.
4. Check color harmony with the existing Celune dark theme.
5. Present suggestions to Eric.

## Sequence

- Blocked by: Code Review
- Must complete before: Project Retro

## Blockers

None.

---

### Task 9: Project retrospective

- **ID:** `f618dbaa-7a26-4a92-9c3f-9ab758850c89`
- **Sprint:** 5
- **Priority:** normal
- **Assignee:** sage
- **Status:** inbox
- **Depends on:** Design feedback (`b6064122`)

## What

Retrospective reviewing PRD, code review findings, design feedback, and overall project execution.

## Approach

1. Gather context: PRD, CR findings, DF findings, all task outcomes.
2. Produce structured retro: Pros, Cons, Action Items.
3. Create follow-up tasks for each action item.
4. Post retro as comment and outcome.

## Sequence

- Blocked by: Design Feedback
- This is the last task.

## Blockers

None.

---

## API Research Summary

Anthropic Claude does **NOT** support image generation (vision/analysis only).

| Option                   | Price/image | Quality   | API  | Brand Consistency       | Recommendation |
| ------------------------ | ----------- | --------- | ---- | ----------------------- | -------------- |
| FLUX 1.1 Pro (Replicate) | $0.04       | Excellent | REST | Prompt + LoRA fine-tune | **Primary**    |
| DALL-E 3 (OpenAI)        | $0.04-0.08  | Good      | REST | Prompt-only             | Fallback       |
| Nano Banana 2 (Google)   | TBD (low)   | Good      | REST | Multi-reference images  | Monitor        |
| FLUX Dev + LoRA          | $0.025      | Excellent | REST | Custom fine-tune        | Future         |
| Stable Diffusion 3.5     | $0.04       | Very good | REST | Prompt + LoRA           | Alternative    |

## Open Questions

1. Budget cap per image generation?
2. Store generated images in repo or CDN (Vercel Blob)?
3. Seed/variation system for deterministic per-post images?
