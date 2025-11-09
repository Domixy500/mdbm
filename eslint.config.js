/*jslint beta, node, unordered*/
/*global*/

import eslintParserTs from "@typescript-eslint/parser";
import plugins from "./eslint/plugins/index.js";
import rules from "./eslint/rules/index.js";

export default [
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            parser: eslintParserTs,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: "module"
            }
        },
        plugins,
        rules
    }
];
