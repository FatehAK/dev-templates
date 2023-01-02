module.exports = {
  root: true,
  env: {
    es2022: true,
    browser: true,
    node: true,
  },
  extends: ['semistandard', 'plugin:import/recommended', 'plugin:sonarjs/recommended', 'plugin:promise/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // turn off some stricter rules for flexibility
    'global-require': 'off',
    'func-names': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // allow _ as ignored params
    'sort-imports': 'off', // turned off in favour of import/order rule
    'import/order': [
      'error',
      {
        'newlines-between': 'ignore',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      },
    ],
  },
  // 'only-warn' plugin turns all errors and warnings reported by eslint into warnings so that its easier to check in CI env
  // 'html' and '@html-eslint' are for linting .html files using eslint, remove them if not required
  plugins: ['only-warn', 'import', 'sonarjs', 'promise', 'html', '@html-eslint'],
  overrides: [
    {
      // rules for linting .html files
      files: ['*.html'],
      parser: '@html-eslint/parser',
      extends: ['plugin:@html-eslint/recommended'],
      rules: {
        'spaced-comment': 'off',
        '@html-eslint/indent': 'off',
        '@html-eslint/require-meta-charset': 'error',
        '@html-eslint/require-meta-viewport': 'error',
        '@html-eslint/require-meta-description': 'off',
        '@html-eslint/require-button-type': 'error',
        '@html-eslint/element-newline': 'off',
        '@html-eslint/no-target-blank': 'error',
        '@html-eslint/no-duplicate-id': 'error',
        '@html-eslint/no-extra-spacing-attrs': ['error', { enforceBeforeSelfClose: true }],
        '@html-eslint/require-closing-tags': ['error', { selfClosing: 'always' }],
        '@html-eslint/id-naming-convention': ['error', 'camelCase'],
      },
    },
  ],
  settings: {
    // we configure the import/resolver to help 'eslint-plugin-import' understand path aliases
    'import/resolver': {
      alias: {
        map: [['appConfig', './appConfig']],
        extensions: ['.js', '.json'],
      },
    },
  },
};
