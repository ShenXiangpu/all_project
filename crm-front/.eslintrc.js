export default {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  parser: "babel-eslint",
  plugins:['vue'],
  rules: {
    // 允许使用 const 和 let
    "no-undef": "off",
    "no-unused-vars": "warn",
    "no-console": "warn",
  },
};
