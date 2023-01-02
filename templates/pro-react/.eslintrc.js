const getImportGroups = () => {
  const external = ['react', 'react-router-dom', '@linaria/+(core|react)'];
  const internal = ['pages/**', 'components/**', 'theme/**', 'constants/**', 'assets/**'];
  return external
    .map(pattern => ({ pattern, group: 'external', position: 'before' }))
    .concat(internal.map(pattern => ({ pattern, group: 'internal', position: 'before' })));
};

module.exports = {
  root: true,
  env: {
    es2022: true,
    browser: true,
    node: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:react/jsx-runtime', 'plugin:sonarjs/recommended', 'plugin:promise/recommended', 'prettier'],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // turn off some stricter rules for flexibility
    'global-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'func-names': 'off',
    'no-console': 'off',
    'react/jsx-no-useless-fragment': 'off', // allows empty fragments
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }], // only allow arrow fn components
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // allow _ as ignored params
    'sort-imports': 'off', // turned off in favour of import/order rule
    'import/order': [
      'error',
      {
        'newlines-between': 'ignore',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        // enforce import ordering
        pathGroups: getImportGroups(),
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
  },
  // 'only-warn' plugin turns all errors and warnings reported by eslint into warnings so that its easier to check in CI env
  // 'html' and '@html-eslint' are for linting .html files using eslint, remove them if not required
  plugins: ['only-warn', 'react', 'sonarjs', 'promise', 'html', '@html-eslint'],
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
        map: [
          ['pages', './src/pages'],
          ['components', './src/components'],
          ['theme', './src/theme'],
          ['constants', './src/constants'],
          ['assets', './src/assets'],
          ['appConfig', './appConfig'],
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
};
