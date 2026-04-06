/*jslint beta*/
/*global*/

import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin";
import custom from "./custom/index.js";

export default Object.freeze({
    "@custom": custom,
    "@stylistic": stylistic,
    "@typescript-eslint": eslintPluginTs
});
