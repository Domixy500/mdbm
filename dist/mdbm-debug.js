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
        log(`${type(e)}: ${typeof value(e)}`);
        return value(e).toString();
    }
    exports.notify = notify;
    exports.valueAsString = valueAsString;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
