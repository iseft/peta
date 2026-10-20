import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['**/*.tsbuildinfo*', 'dist/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
    },
  },
];
