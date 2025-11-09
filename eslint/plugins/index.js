import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin";
import custom from "./custom/index.js";

export default {
    "@typescript-eslint": eslintPluginTs,
    "@stylistic": stylistic,
    custom
};
