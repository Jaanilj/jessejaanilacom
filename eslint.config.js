import jsEslint from '@eslint/js'
import tsEslint from '@typescript-eslint/eslint-plugin'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  jsEslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    settings: { react: { version: '18.2' } },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { modules: true, jsx: true },
        ecmaVersion: 'latest',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.es2021,
        ...globals.browser,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': tsEslint,
    },
    rules: {
      ...tsEslint.configs['eslint-recommended'].rules,
      ...tsEslint.configs.recommended.rules,
      ...tsEslint.configs['recommended-requiring-type-checking'].rules,
      ...tsEslint.configs.strict.rules,
      ...react.configs.recommended.rules,
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-undef': 'off',
    },
  },
]
