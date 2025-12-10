export default Object.freeze({
    "@stylistic/eol-last": ["error", "always"],
    "@stylistic/indent": ["error", 4],
    "@stylistic/object-curly-spacing": ["error", "never"],
    "@stylistic/semi": ["error", "always"],
    "@stylistic/type-annotation-spacing": ["error", {
        "after": true,
        "before": false,
        "overrides": {
            "arrow": { "after": true, "before": true },
            "colon": { "after": true, "before": false }
        }
    }]
});
