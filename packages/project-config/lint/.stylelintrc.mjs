export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind']
      }
    ],
    'order/properties-alphabetical-order': true,
    'no-empty-source': null,
    'rule-empty-line-before': null,
    'no-descending-specificity': null,
    'selector-class-pattern': '^[a-z][a-z0-9-_]*$',
    'selector-id-pattern': '^[a-z_][a-z0-9-_]*$',
    'keyframes-name-pattern': '^[a-z][a-z0-9-_]*$',
    'no-invalid-double-slash-comments': null,
    'block-no-empty': null,
    'import-notation': 'notation'
  }
};
