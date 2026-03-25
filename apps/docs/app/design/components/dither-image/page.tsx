'use client';

import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DitherImage, DITHER_PALETTES } from '@/components/celune/dither-image';

export default function DitherImagePage() {
  return (
    <>
      <h1>Dither Image</h1>
      <p>
        Floyd-Steinberg error diffusion dithering applied to any image via Canvas 2D. Produces a
        retro 1-bit pixel art aesthetic. Hover crossfades back to the original image. Useful for
        generating brand assets with a distinctive visual style.
      </p>

      <h2>Monochrome (Default)</h2>
      <ComponentPreview>
        <DitherImage
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
          width={400}
          height={300}
        />
      </ComponentPreview>

      <CodeBlock
        code={`import { DitherImage } from '@/components/celune/dither-image'

<DitherImage
  src="/your-image.png"
  width={400}
  height={300}
/>`}
        lang="tsx"
      />

      <h2>Celune Brand Palette</h2>
      <ComponentPreview>
        <DitherImage
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
          width={400}
          height={300}
          palette={DITHER_PALETTES.celune}
        />
      </ComponentPreview>

      <CodeBlock
        code={`import { DitherImage, DITHER_PALETTES } from '@/components/celune/dither-image'

<DitherImage
  src="/hero.png"
  width={640}
  height={480}
  palette={DITHER_PALETTES.celune}
/>`}
        lang="tsx"
      />

      <h2>Gameboy Palette</h2>
      <ComponentPreview>
        <DitherImage
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
          width={400}
          height={300}
          palette={DITHER_PALETTES.gameboy}
        />
      </ComponentPreview>

      <CodeBlock code={`<DitherImage src="..." palette={DITHER_PALETTES.gameboy} />`} lang="tsx" />

      <h2>Built-in Palettes</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Colors</th>
            <th>Style</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>monochrome</code>
            </td>
            <td>Black + White</td>
            <td>Classic 1-bit</td>
          </tr>
          <tr>
            <td>
              <code>celune</code>
            </td>
            <td>Black + Brand Green + White</td>
            <td>On-brand retro</td>
          </tr>
          <tr>
            <td>
              <code>gameboy</code>
            </td>
            <td>4 greens</td>
            <td>Nintendo DMG</td>
          </tr>
          <tr>
            <td>
              <code>cga</code>
            </td>
            <td>Black + Cyan + Magenta + White</td>
            <td>80s CGA</td>
          </tr>
          <tr>
            <td>
              <code>macintosh</code>
            </td>
            <td>Black + White</td>
            <td>Mac Classic</td>
          </tr>
          <tr>
            <td>
              <code>sepia</code>
            </td>
            <td>Dark brown + Cream</td>
            <td>Vintage photo</td>
          </tr>
        </tbody>
      </table>

      <h2>Props</h2>
      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>src</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>Required</td>
          </tr>
          <tr>
            <td>
              <code>width</code>
            </td>
            <td>
              <code>number</code>
            </td>
            <td>Required</td>
          </tr>
          <tr>
            <td>
              <code>height</code>
            </td>
            <td>
              <code>number</code>
            </td>
            <td>Required</td>
          </tr>
          <tr>
            <td>
              <code>palette</code>
            </td>
            <td>
              <code>[r,g,b][]</code>
            </td>
            <td>Monochrome</td>
          </tr>
          <tr>
            <td>
              <code>className</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>—</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
