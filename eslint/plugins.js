/*jslint beta*/
/*global*/

import typescript from "@typescript-eslint/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin";
import custom from "./custom/index.js";
import perfectionist from "eslint-plugin-perfectionist";

export default Object.freeze({
    "@custom": custom,
    "@perfectionist": perfectionist,
    "@stylistic": stylistic,
    "@typescript": typescript
});
