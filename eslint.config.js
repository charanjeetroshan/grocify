// https://docs.expo.dev/guides/using-eslint/
const expoConfig = require("eslint-config-expo/flat")
const eslintPrettierPlugin = require("eslint-plugin-prettier")
const tseslint = require("typescript-eslint")
const { defineConfig } = require("eslint/config")

const unusedVarsOptions = {
   args: "all",
   argsIgnorePattern: "^_",
   caughtErrors: "all",
   caughtErrorsIgnorePattern: "^_",
   destructuredArrayIgnorePattern: "^_",
   vars: "all",
   varsIgnorePattern: "^_",
   ignoreRestSiblings: true,
}

module.exports = defineConfig([
   {
      ignores: ["node_modules", ".expo", "dist", "build", "android", "ios"],
   },
   ...expoConfig,
   {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: {
         prettier: eslintPrettierPlugin,
      },
      rules: {
         "prettier/prettier": [
            "warn",
            {
               tabWidth: 3,
               bracketSameLine: true,
               semi: false,
               printWidth: 120,
               singleQuote: false,
               endOfLine: "auto",
            },
         ],
         "react/display-name": "off",
         "react/jsx-curly-brace-presence": "warn",
      },
   },
   {
      files: ["**/*.{js,jsx}"],
      rules: {
         "no-unused-vars": ["warn", unusedVarsOptions],
      },
   },
   {
      files: ["**/*.{ts,tsx}"],
      plugins: {
         "@typescript-eslint": tseslint.plugin,
      },
      rules: {
         "no-unused-vars": "off",
         "@typescript-eslint/no-unused-vars": ["warn", unusedVarsOptions],
      },
   },
])
