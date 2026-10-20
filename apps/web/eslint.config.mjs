import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
    },
  },
  {
    ignores: [
      '.next/',
      'media/',
      'src/payload-types.ts',
      'src/app/(payload)/admin/importMap.js',
      'src/marketing/migrations/',
    ],
  },
]

export default eslintConfig
