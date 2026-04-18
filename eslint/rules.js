/*jslint beta*/
/*global*/

export default Object.freeze({
    "@custom/noFoo": "error",
    "@custom/ternary": "warn",
    "@perfectionist/sort-modules": ["error", {order: "asc"}],
    "@stylistic/indent": ["error", 4, {
        "ignoredNodes": ["ConditionalExpression"]
    }]
});
