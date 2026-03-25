'use client';

import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { CodePlayground } from '@/components/code-playground';

export default function CodePlaygroundPage() {
  return (
    <>
      <h1>Code Playground</h1>
      <p>
        Interactive code editor powered by Sandpack (CodeSandbox). Renders a live editor with syntax
        highlighting and optional preview pane. Used in documentation to let readers experiment with
        API examples.
      </p>

      <h2>React Template</h2>
      <ComponentPreview className="block p-0">
        <CodePlayground
          template="react"
          files={{
            '/App.js': `export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h1>Hello from Celune</h1>
      <p>Edit this code to see live changes.</p>
    </div>
  )
}`,
          }}
          showPreview
        />
      </ComponentPreview>

      <CodeBlock
        code={`import { CodePlayground } from '@/components/code-playground'

<CodePlayground
  template="react"
  files={{
    '/App.js': \`export default function App() {
  return <h1>Hello from Celune</h1>
}\`
  }}
  showPreview
/>`}
        lang="tsx"
      />

      <h2>Vanilla JS (No Preview)</h2>
      <ComponentPreview className="block p-0">
        <CodePlayground
          template="vanilla"
          files={{
            '/index.js': `// Create a task via the Celune API
const response = await fetch('https://app.celune.ai/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY',
  },
  body: JSON.stringify({
    title: 'Review PR #42',
    priority: 'high',
    assignee: 'scan',
  }),
});

const task = await response.json();
console.log('Created:', task.id);`,
          }}
        />
      </ComponentPreview>

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
              <code>template</code>
            </td>
            <td>
              <code>&quot;react&quot; | &quot;vanilla&quot; | &quot;vanilla-ts&quot;</code>
            </td>
            <td>
              <code>&quot;vanilla&quot;</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>files</code>
            </td>
            <td>
              <code>Record&lt;string, string&gt;</code>
            </td>
            <td>Required</td>
          </tr>
          <tr>
            <td>
              <code>showPreview</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>
              <code>false</code>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
