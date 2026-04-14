var mdbm = function() {
    "use strict";
    function create(typeName) {
        message(typeName);
    }
    var object = Object.freeze({
        create: create
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
