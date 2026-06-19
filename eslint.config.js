// https://docs.expo.dev/guides/using-eslint/
const expoConfig = require("eslint-config-expo/flat");
const eslintPrettierPlugin = require("eslint-plugin-prettier");
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
   expoConfig,
   {
      ignores: ["dist/*"],
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
         "no-unused-vars": "off",
         "@typescript-eslint/no-unused-vars": [
            "warn",
            {
               args: "all",
               argsIgnorePattern: "^_",
               caughtErrors: "all",
               caughtErrorsIgnorePattern: "^_",
               destructuredArrayIgnorePattern: "^_",
               vars: "all",
               varsIgnorePattern: "^_",
               ignoreRestSiblings: true,
            },
         ],
      },
   },
]);
