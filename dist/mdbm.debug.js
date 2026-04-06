var mdbm = function() {
    "use strict";
    function toast(text) {
        message(text);
    }
    var index = Object.freeze({
        toast: toast
    });
    return index;
}();
