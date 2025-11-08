/*jslint beta, node, unordered*/
/*global*/

import eslintParserTs from "@typescript-eslint/parser";
import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin";
import freezeExports from "./eslintRules/freezeExports.js";

const rules = {
    "@typescript-eslint/explicit-function-return-type": "error",
    "@stylistic/indent": ["error", 4],
    "@stylistic/semi": ["error", "always"],
    "local/freezeExports": "error"
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
            "@typescript-eslint": eslintPluginTs,
            local: {
                rules: {
                    "freezeExports": freezeExports
                }
            }
        },
        rules
    }
];

export default config; //jslint-ignore-line
