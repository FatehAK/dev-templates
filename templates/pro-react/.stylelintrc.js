const propertyOrder = require('stylelint-config-clean-order');

// Overwrite empty line threshold since default value of 6 is very low
propertyOrder.rules['order/properties-order'][1].unspecified = 'bottom';
propertyOrder.rules['order/properties-order'][1].emptyLineMinimumPropertyThreshold = 25;

module.exports = {
  defaultSeverity: 'warning', // treats all issues as 'warnings' so that we can use it in CI env
  reportDescriptionlessDisables: true,
  extends: ['stylelint-config-standard', 'stylelint-config-html'],
  plugins: ['stylelint-declaration-block-no-ignored-properties', 'stylelint-order'],
  rules: {
    ...propertyOrder.rules,
    'plugin/declaration-block-no-ignored-properties': true,
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'stylelint-commands'],
      },
    ],
    'custom-property-empty-line-before': 'never',
  },
  overrides: [
    {
      files: '**/*.{styles.js,jsx}',
      // TODO: replace with '@linaria/postcss-linaria' once https://github.com/callstack/linaria/issues/1074 is fixed
      customSyntax: '@stylelint/postcss-css-in-js',
      // linaria specific rules and overrides
      rules: {
        'function-url-quotes': 'never',
        'property-no-vendor-prefix': true,
        'string-no-newline': true,
        'value-no-vendor-prefix': true,
        'no-empty-source': null,
        // /* pcss-lin */ placeholder comments are added during parsing
        'comment-empty-line-before': [
          'always',
          {
            except: ['first-nested'],
            ignore: ['stylelint-commands'],
            ignoreComments: [/pcss-lin/],
          },
        ],
        //  '//' comments create unknown word issues while linting. Force using /* */
        'no-invalid-double-slash-comments': true,
      },
    },
  ],
};
