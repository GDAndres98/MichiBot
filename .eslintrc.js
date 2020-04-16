module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    indent: ['error', 2, { VariableDeclarator: { var: 2, let: 2, const: 3 } }],
    'key-spacing': [
      'error',
      {
        multiLine: {
          beforeColon: false,
          afterColon: true,
        },
        align: {
          beforeColon: true,
          afterColon: true,
          on: 'colon',
        },
        singleLine: {
          beforeColon: false,
          afterColon: true,
        },
      },
    ],
    'linebreak-style': ['error', 'windows'],
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
  },
};
