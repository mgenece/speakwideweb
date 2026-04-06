// eslint.config.js (or .eslintrc.js depending on your setup)
import { config } from '@wtsreact/eslint-config/next';

export default [
  ...config,
  {
    rules: {
      // Allow `any`
      '@typescript-eslint/no-explicit-any': 'off',

      // Allow `@ts-ignore`
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': false, // allow
          'ts-expect-error': true,
          'ts-nocheck': true,
          'ts-check': true,
        },
      ],
    },
  },
];
