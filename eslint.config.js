import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import vitest from '@vitest/eslint-plugin';
import vitestGlobals from 'eslint-config-vitest-globals/flat';

const files = ['{src}/**/*.{ts,tsx}'];

export default defineConfig([
  globalIgnores(['dist']),
  eslintPluginPrettierRecommended,
  vitestGlobals(),
  {
    files,
    plugins: { vitest },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
