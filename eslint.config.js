/*jslint beta, node, unordered*/
/*global*/

import eslintParserTs from "@typescript-eslint/parser";
import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin";

const rules = {
    "@typescript-eslint/explicit-function-return-type": "error",
    "@stylistic/indent": ["error", 4],
    "@stylistic/object-curly-spacing": ["error", "never"],
    "@stylistic/semi": ["error", "always"]
};

const config = [
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            parser: eslintParserTs,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: "module"
            }
        },
        plugins: {
            "@stylistic": stylistic,
            "@typescript-eslint": eslintPluginTs
        },
        rules
    }
];

export default config; //jslint-ignore-line
