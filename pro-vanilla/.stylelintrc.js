const propertyOrder = require('stylelint-config-clean-order');

// Overwrite empty line threshold since default value of 6 is very low
propertyOrder.rules['order/properties-order'][1].unspecified = 'bottom';
propertyOrder.rules['order/properties-order'][1].emptyLineMinimumPropertyThreshold = 25;

module.exports = {
  defaultSeverity: 'warning', // treats all issues as 'warnings' so that we can use it in CI env
  reportDescriptionlessDisables: true,
  extends: ['stylelint-config-standard', 'stylelint-config-html', 'stylelint-config-prettier'],
  plugins: ['stylelint-declaration-block-no-ignored-properties', 'stylelint-order'],
  rules: {
    ...propertyOrder.rules,
    'plugin/declaration-block-no-ignored-properties': true,
    'custom-property-empty-line-before': 'never',
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'stylelint-commands'],
      },
    ],
  },
};
