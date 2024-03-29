module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    templateDataType: false,
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    // 'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    // 'plugin:jsx-a11y/recommended',
    // 'plugin:prettier/recommended', // Make sure this is always the last element in the array.
  ],
  // plugins: ['simple-import-sort', 'prettier'],
  rules: {
    // 'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/display-name': 'off',
    // 'jsx-a11y/accessible-emoji': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    // 'simple-import-sort/imports': 'off',
    // 'simple-import-sort/exports': 'error',
    'no-debugger': 0,
    eqeqeq: 2,
    'default-case': 1,
    'no-empty-function': 1,
    'no-multi-spaces': 1,
    'spaced-comment': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 3 }],
  },
};
