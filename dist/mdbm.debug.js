var mdbm = function() {
    "use strict";
    function test(text) {
        message(text);
    }
    var object = Object.freeze({
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
