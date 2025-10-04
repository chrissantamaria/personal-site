import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import next from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  reactHooks.configs['recommended-latest'],

  next.flatConfig.recommended,
  next.flatConfig.coreWebVitals,

  importPlugin.flatConfigs.recommended,
  {
    languageOptions: {
      // importPlugin overrides this to `ecmaVersion: 2018`
      ecmaVersion: 'latest',
    },
    rules: {
      // Disable, this this has trouble resolving dependencies
      // + we have coverage from typechecking
      'import/no-unresolved': 'off',
    },
  },

  // TypeScript-specific configuration
  {
    extends: [
      tseslint.configs.recommendedTypeChecked,
      importPlugin.flatConfigs.typescript,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
);
