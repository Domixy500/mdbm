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
    function valueAsString(e) {
        const val = value(e);
        return typeof val;
    }
    exports.notify = notify;
    exports.valueAsString = valueAsString;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
