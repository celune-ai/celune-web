/**
 * Hero Image Generation — Prompt Templates & Configuration
 *
 * Abstract watercolor-style images branded to Celune:
 * - Dark backgrounds (#08080a to #1a1a2e)
 * - Emerald/green accents (#22c55e, #16a34a, #86efac)
 * - Watercolor textures, organic forms, no text
 */

export const IMAGE_CONFIG = {
  /** Replicate model identifier */
  model: 'black-forest-labs/flux-1.1-pro' as const,

  /** Output dimensions — 16:9 for hero display, also works for OG cards after crop */
  width: 1440,
  height: 810,

  /** JPEG compression quality for final output */
  jpegQuality: 85,

  /** Max file size target in bytes (200KB) */
  maxFileSize: 200 * 1024,

  /** Output directory relative to site app root */
  outputDir: 'public/blog',
};

/**
 * Variation parameters — each post gets a unique combination
 * to ensure collection cohesion with individual character.
 */
interface PromptVariation {
  colorEmphasis: string;
  shapes: string;
  texture: string;
  mood: string;
}

const VARIATIONS: PromptVariation[] = [
  {
    colorEmphasis: 'deep emerald green and forest teal',
    shapes: 'flowing organic ribbons and gentle curves',
    texture: 'soft wet-on-wet watercolor washes with bleeding edges',
    mood: 'calm and contemplative',
  },
  {
    colorEmphasis: 'muted sage green and dark jade',
    shapes: 'layered circular forms and soft halos',
    texture: 'granulated watercolor with visible paper grain',
    mood: 'mysterious and elegant',
  },
  {
    colorEmphasis: 'bright emerald with hints of warm amber',
    shapes: 'scattered droplets and splatter patterns',
    texture: 'wet watercolor splashes on dark surface',
    mood: 'energetic and dynamic',
  },
  {
    colorEmphasis: 'dark teal and seafoam green',
    shapes: 'horizontal bands and atmospheric layers',
    texture: 'diffused watercolor gradients blending into darkness',
    mood: 'serene and expansive',
  },
  {
    colorEmphasis: 'rich viridian green and cool mint',
    shapes: 'branching tree-like fractals and veins',
    texture: 'ink-in-water diffusion with fine tendrils',
    mood: 'intricate and organic',
  },
  {
    colorEmphasis: 'malachite green with subtle purple undertones',
    shapes: 'concentric rings and ripple patterns',
    texture: 'translucent watercolor glazes layered over dark ground',
    mood: 'deep and meditative',
  },
  {
    colorEmphasis: 'chartreuse green fading to dark forest',
    shapes: 'angular crystalline shards softened by water',
    texture: 'controlled watercolor bleeds with sharp and soft edges',
    mood: 'bold and architectural',
  },
  {
    colorEmphasis: 'emerald green with warm golden highlights',
    shapes: 'swirling vortex and spiral forms',
    texture: 'thick impasto-like watercolor with rich pigment concentration',
    mood: 'warm and inviting',
  },
  {
    colorEmphasis: 'dark pine green and silver-grey',
    shapes: 'cloud-like nebula forms and soft masses',
    texture: 'smoky watercolor with dry brush accents',
    mood: 'atmospheric and dreamy',
  },
  {
    colorEmphasis: 'vivid green and deep ocean teal',
    shapes: 'fluid wave-like undulations',
    texture: 'flowing wet watercolor with luminous transparency',
    mood: 'fluid and graceful',
  },
];

/**
 * Explicit slug → variation mapping for maximum visual diversity.
 * New posts not in this map fall back to a hash-based assignment.
 */
const SLUG_VARIATION_MAP: Record<string, number> = {
  'one-person-startup-ai-agents': 0,
  'control-ai-agent-costs': 1,
  'second-brain-ai-agents': 2,
  'mcp-servers-ai-agents': 3,
  'ai-agent-job-description': 4,
  'ship-features-while-you-sleep': 5,
  'ai-code-review-bottleneck': 6,
  'agent-native-task-management': 7,
  'ai-agent-persistent-memory': 8,
  'building-with-ai-agents': 9,
  'context-engineering-ai-agents': 5,
  'hooks-skills-ai-agent-automation': 6,
};

function slugToIndex(slug: string): number {
  if (slug in SLUG_VARIATION_MAP) return SLUG_VARIATION_MAP[slug];
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % VARIATIONS.length;
}

/**
 * Build the full generation prompt for a blog post.
 * Each slug maps to a unique variation while keeping the core style consistent.
 */
export function buildPrompt(slug: string): string {
  const v = VARIATIONS[slugToIndex(slug)];

  return [
    `Abstract watercolor painting on a very dark background (#0a0a0f).`,
    `Color palette: ${v.colorEmphasis}, with the colors appearing luminous against the dark ground.`,
    `Composition: ${v.shapes}, arranged with generous negative space.`,
    `Texture: ${v.texture}.`,
    `Mood: ${v.mood}.`,
    `The painting should feel like a premium gallery piece — minimal, refined, and striking.`,
    `No text, no letters, no words, no symbols, no logos, no recognizable objects.`,
    `Pure abstract expressionist watercolor art. High resolution, photographic capture of the painting.`,
  ].join(' ');
}

/**
 * Get all blog slugs that need hero images generated.
 * Reads from the blog registry so new posts are picked up automatically.
 */
export function getAllSlugs(): string[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { posts } = require('../src/lib/blog') as { posts: { slug: string; published: boolean; heroImage?: string }[] };
  return posts
    .filter((p) => p.published && p.heroImage)
    .map((p) => p.slug);
}
