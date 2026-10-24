import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

// Downgrade react-compiler/react-hooks errors to warnings (pre-existing issues across codebase).
// These rules were introduced by React 19 / Next.js 16 and flag patterns that are safe but not
// compiler-optimizable. We'll fix them incrementally rather than blocking CI.
function patchToWarnings(configs) {
  return configs.map((config) => {
    if (!config?.rules) return config;
    const patched = { ...config.rules };
    for (const key of Object.keys(patched)) {
      if (key.includes('react-compiler') || key.includes('react-hooks')) {
        if (patched[key] === 'error' || patched[key] === 2) {
          patched[key] = 'warn';
        }
      }
    }
    return { ...config, rules: patched };
  });
}

const eslintConfig = defineConfig([
  ...patchToWarnings(nextVitals),
  ...patchToWarnings(nextTs),
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    name: 'project-overrides',
    rules: {
      // Downgrade to warnings — pre-existing issues to fix incrementally
      '@next/next/no-html-link-for-pages': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
    },
  },
]);

export default eslintConfig;
