module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    // sourceMap: "module"
  },
  plugins: ['prettier', '@typescript-eslint'],
  ignorePatterns: ['node_modules/'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // 在对象的括号后加','符号
    '@typescript-eslint/comma_dangle': 'off',
    'prefer-const': 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'never',
      },
    ],
    quotes: ['error', 'single', { allowTemplateLiterals: true }], //单引号
    semi: ['error', 'never'], //没有分号
    'prettier/prettier': 'error',
  },
}
