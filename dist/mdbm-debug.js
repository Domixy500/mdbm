var mdbm = function(exports) {
    "use strict";
    const notify = function(text) {
        message(text);
        log(text);
    };
    const stringConverter = {
        multiLine: value,
        singleLine: value
    };
    function type(e) {
        return e.field("Type");
    }
    function value(e) {
        return e.field(type(e));
    }
    function valueAsString(e) {
        type(e);
        const hasConverter = Object.keys(stringConverter).includes(type);
        return hasConverter ? stringConverter[type](e) : type;
    }
    exports.notify = notify;
    exports.valueAsString = valueAsString;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
