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
    var index$1 = Object.freeze({
        __proto__: null,
        default: index
    });
    function toast(text) {
        message(text);
    }
    exports.object = index$1;
    exports.toast = toast;
    return exports;
}({});
