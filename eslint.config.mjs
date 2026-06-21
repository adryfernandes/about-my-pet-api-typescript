import love from 'eslint-config-love';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/**', 'build/**', '**/*.json', 'eslint.config.mjs'],
  },
  {
    ...love,
    files: ['**/*.ts'],
    languageOptions: {
      ...love.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    settings: {
      'import/resolver': {
        typescript: { alwaysTryTypes: true },
      },
    },
    rules: {
      ...love.rules,
      camelcase: ['error', { properties: 'never' }],
      'spaced-comment': 'error',
      'consistent-return': 'error',
      'no-else-return': 'warn',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'array-callback-return': 'error',
      eqeqeq: ['error', 'always'],
      'no-await-in-loop': 'warn',
      curly: ['error', 'all'],
      'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: false }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      'import/no-duplicates': ['error', { considerQueryString: true }],
      'import/order': [
        'error',
        {
          pathGroups: [
            { pattern: 'src/**', group: 'internal' },
            { pattern: '@/interfaces/**', group: 'type', position: 'after' },
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc' },
        },
      ],
    },
  },
  {
    ...prettierRecommended,
    rules: {
      ...prettierRecommended.rules,
      'prettier/prettier': ['error', { semi: true, endOfLine: 'auto' }],
    },
  },
];