'use client';

import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { PixelGrid } from '@/components/celune/pixel-grid';

export default function PixelGridPage() {
  return (
    <>
      <h1>Pixel Grid</h1>
      <p>
        Canvas-based animated pixel grid background. Pixels reveal in a wave pattern from the center
        on mount, and glow brand-green near the cursor on hover. Designed as a background decoration
        behind hero sections.
      </p>

      <h2>Default</h2>
      <ComponentPreview className="relative min-h-[300px] overflow-hidden p-0">
        <PixelGrid />
        <div className="relative z-10 flex h-full min-h-[300px] items-center justify-center">
          <p className="text-lg font-medium text-white">Content renders on top</p>
        </div>
      </ComponentPreview>

      <CodeBlock
        code={`import { PixelGrid } from '@/components/celune/pixel-grid'

<section className="relative">
  <PixelGrid />
  <div className="relative z-10">
    {/* Your content here */}
  </div>
</section>`}
        lang="tsx"
      />

      <h2>Custom Colors</h2>
      <ComponentPreview className="relative min-h-[200px] overflow-hidden p-0">
        <PixelGrid glowColor="#ff6b6b" gridColor="#2a1a1a" />
        <div className="relative z-10 flex h-full min-h-[200px] items-center justify-center">
          <p className="text-sm text-white/60">Red glow variant</p>
        </div>
      </ComponentPreview>

      <CodeBlock code={`<PixelGrid glowColor="#ff6b6b" gridColor="#2a1a1a" />`} lang="tsx" />

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
              <code>bgColor</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>
              <code>#0a0a0a</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>gridColor</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>
              <code>#1a1a1a</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>glowColor</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>
              <code>#5BC586</code> (brand green)
            </td>
          </tr>
          <tr>
            <td>
              <code>glowRadius</code>
            </td>
            <td>
              <code>number</code>
            </td>
            <td>
              <code>80</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>waveSpeed</code>
            </td>
            <td>
              <code>number</code>
            </td>
            <td>
              <code>0.15</code>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
