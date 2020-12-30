module.exports = {
  root: true,
  env: { browser: true, node: true },
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-typescript/base',
    'prettier',
    'prettier/@typescript-eslint',
  ],
}
