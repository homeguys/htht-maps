module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    // '@vue/airbnb',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'prettier/prettier': [
    //   'off',
    //   {
    //     singleQuote: true,
    //   },
    // ],
    'vue/first-attribute-linebreak': [
      2,
      {
        // 单行时，第一属性前不允许使用换行符
        singleline: 'ignore',
        // 多行时，第一属性前必须使用换行符
        multiline: 'below',
      },
    ],
    semi: 'off',
    'no-undef': 'off',
    'object-curly-newline': 'off',
    'no-unused-vars': 'warn',
    'vue/no-unused-components': 'warn',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
