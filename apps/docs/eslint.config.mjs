import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const config = [
  ...nextVitals,
  ...nextTs,
  {
    // React Compiler rules; this app does not use the compiler, and the flagged
    // effects (hover resets, count-up and canvas animation loops) are intended.
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/immutability': 'off',
    },
  },
  { ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'] },
];

export default config;
