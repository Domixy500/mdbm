/*jslint beta, node*/
/*global*/

import eslintParserTs from "@typescript-eslint/parser";
import plugins from "./eslint/plugins.js";
import rules from "./eslint/rules.js";

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
