var mdbm = function(exports) {
    "use strict";
    const notify = function(text) {
        message(text);
        log(text);
    };
    function type(e) {
        return e.field("Type");
    }
    function value(e) {
        return e.field(type(e));
    }
    const stringConverter = {
        multiLine: value,
        singleLine: value
    };
    function hasConverter(key) {
        return Object.keys(stringConverter).includes(key);
    }
    function valueAsString(e) {
        const propertyType = type(e);
        return hasConverter(propertyType) ? stringConverter[type](e) : type;
    }
    exports.notify = notify;
    exports.valueAsString = valueAsString;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
