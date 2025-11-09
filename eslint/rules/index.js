/*jslint beta, node*/
/*global*/

import customRules from "./custom.js";
import stylisticRules from "./stylistic.js";
import typescriptRules from "./typescript.js";

const rules = Object.assign(
    Object.create(null),
    customRules,
    stylisticRules,
    typescriptRules
);

export default Object.freeze(rules);
