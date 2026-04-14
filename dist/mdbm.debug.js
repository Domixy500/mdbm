var mdbm = function(exports) {
    "use strict";
    function create(typeName) {
        message(typeName);
    }
    function test(typeName) {
        message(typeName);
    }
    var index = Object.freeze({
        create: create,
        test: test
    });
    function toast(text) {
        message(text);
    }
    exports.object = index;
    exports.toast = toast;
    return exports;
}({});
