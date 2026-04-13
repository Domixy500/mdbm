var mdbm = function() {
    "use strict";
    function create(typeName) {
        message(typeName);
    }
    function test(typeName) {
        message(typeName);
    }
    var index$1 = Object.freeze({
        create: create,
        test: test
    });
    var object = Object.freeze({
        __proto__: null,
        default: index$1
    });
    function toast(text) {
        message(text);
    }
    var index = Object.freeze({
        object: object,
        toast: toast
    });
    return index;
}();
