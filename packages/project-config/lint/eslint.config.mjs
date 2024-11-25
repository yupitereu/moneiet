import { resolve } from 'node:path';

import { fixupPluginRules } from '@eslint/compat';
import eslintJs from '@eslint/js';
import eslintPrettier from 'eslint-config-prettier';
import eslintImport from 'eslint-plugin-import';
import onlyWarn from 'eslint-plugin-only-warn';
import hooksPlugin from 'eslint-plugin-react-hooks';
import eslintTurbo from 'eslint-plugin-turbo';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

const __dirname = process.cwd();
const project = resolve(__dirname, 'tsconfig.json');

export default [
  eslintJs.configs.recommended,
  eslintPrettier,
  eslintTurbo.configs['flat/recommended'],
  ...typescriptEslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        root: true,
        tsconfigRootDir: __dirname
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: true,
        JSX: true,
        process: true,
        node: true
      }
    },
    plugins: {
      import: eslintImport,
      'only-warn': onlyWarn,
      'unused-imports': unusedImports
    },
    settings: {
      'import/resolver': {
        typescript: {
          project
        }
      },
      next: {
        rootDir: __dirname
      }
    },
    ignores: ['.*.js', 'node_modules', '.next'],
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs', '**/*.jsx'],
    rules: {
      'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': ['warn', { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }],
      'no-else-return': ['error', { allowElseIf: true }],
      'no-nested-ternary': 'off',
      'react/jsx-curly-brace-presence': 'off',
      'react/button-has-type': 'off',
      'react/jsx-no-useless-fragment': 'off',
      'react/no-danger': 'off',
      'no-use-before-define': 'off',
      'turbo/no-undeclared-env-vars': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-require-imports': 'off'
    }
  },
  {
    plugins: {
      'react-hooks': fixupPluginRules(hooksPlugin)
    },
    rules: hooksPlugin.configs.recommended.rules
  }
];
