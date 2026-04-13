var mdbm = function() {
    "use strict";
    function create(typeName) {
        message(typeName);
    }
    function test(typeName) {
        message(typeName);
    }
    var object = Object.freeze({
        __proto__: null,
        create: create,
        test: test
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
