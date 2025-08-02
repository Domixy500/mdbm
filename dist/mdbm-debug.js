var mdbm = function(exports) {
    "use strict";
    const notify = function(text) {
        message("notify");
        message(text);
        log(text);
    };
    exports.notify = notify;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
