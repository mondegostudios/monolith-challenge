module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-empty-function': 0,
    "semi": ["error", "never"],
    "@typescript-eslint/semi": "off",
    "no-unexpected-multiline": "error"
  },
}
