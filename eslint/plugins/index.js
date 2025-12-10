import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import eslintPluginImport from "eslint-plugin-import";
import stylistic from "@stylistic/eslint-plugin";
import custom from "./custom/index.js";

export default Object.freeze({
    "@stylistic": stylistic,
    "@typescript-eslint": eslintPluginTs,
    custom,
    "import": eslintPluginImport
});
