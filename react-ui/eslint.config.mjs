import globals from "globals";
import eslintJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig(
	{
		files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],

		// Extend recommended rule sets from:
		// 1. ESLint JS's recommended rules
		// 2. typescript-eslint's recommended rules
		// 3. ESLint React's recommended rules
		extends: [
			eslintJs.configs.recommended,
			...tseslint.configs.recommended,
		],

		// Configure language/parsing options
		languageOptions: {
			// Include browser global variables (window, document, etc.)
			globals: {
				...globals.browser,
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true, // Enable JSX syntax support
				},
			},
		},

		// Custom rule overrides (modify rule levels or disable rules)
		rules: {},
	},
);