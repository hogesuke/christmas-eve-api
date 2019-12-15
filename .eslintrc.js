module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  'plugins': [
    '@typescript-eslint'
  ],
  rules: {
    'no-unused-vars': 'warn',
    'comma-dangle': 'off',
    'handle-callback-err': 'off',
  }
}
