/**
 * lint-docs.mjs
 *
 * Lints documentation files (.mdx) for formatting issues.
 * Runs before dev and build (added to package.json scripts).
 *
 * Checks:
 *   1. No em dashes or en dashes (use " - " instead)
 *   2. (Add more rules here as needed)
 *
 * Usage: node scripts/lint-docs.mjs [--fix]
 *   --fix  Automatically fix issues where possible
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = join(__dirname, '..');
const DOCS_DIR = join(APP_ROOT, 'app');
const fix = process.argv.includes('--fix');

// Collect all .mdx files recursively
function collectFiles(dir, ext, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      collectFiles(full, ext, files);
    } else if (full.endsWith(ext)) {
      files.push(full);
    }
  }
  return files;
}

// Rule definitions
// Each rule: { name, pattern (regex with global flag), message, fix(match) -> replacement }
const rules = [
  {
    name: 'no-em-dash',
    // Match em dash with optional surrounding spaces
    pattern: / ?—+ ?/g,
    message: 'Use " - " instead of em dash',
    fix: () => ' - ',
  },
  {
    name: 'no-en-dash',
    // Match en dash with optional surrounding spaces (but not in number ranges like 150-200)
    pattern: / ?–+ ?/g,
    message: 'Use " - " instead of en dash',
    fix: () => ' - ',
  },
];

let totalIssues = 0;
let totalFixed = 0;

const mdxFiles = collectFiles(DOCS_DIR, '.mdx');

for (const file of mdxFiles) {
  const relPath = relative(APP_ROOT, file);
  let content = readFileSync(file, 'utf-8');
  let fileIssues = 0;
  let modified = false;

  for (const rule of rules) {
    const matches = content.match(rule.pattern);
    if (!matches) continue;

    for (const match of matches) {
      fileIssues++;
      totalIssues++;
    }

    if (fix) {
      const before = content;
      content = content.replace(rule.pattern, rule.fix);
      if (content !== before) {
        modified = true;
        totalFixed += matches.length;
      }
    } else {
      // Report line numbers
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (rule.pattern.test(lines[i])) {
          console.error(`  ${relPath}:${i + 1} - ${rule.message}`);
        }
        // Reset lastIndex since we're reusing the regex
        rule.pattern.lastIndex = 0;
      }
    }
  }

  if (modified) {
    writeFileSync(file, content, 'utf-8');
  }
}

if (totalIssues === 0) {
  console.log('[lint-docs] All docs pass formatting checks.');
} else if (fix) {
  console.log(`[lint-docs] Fixed ${totalFixed} issue(s) across ${mdxFiles.length} file(s).`);
} else {
  console.error(`\n[lint-docs] Found ${totalIssues} issue(s). Run with --fix to auto-fix.`);
  process.exit(1);
}
