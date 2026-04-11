var mdbm = function() {
    "use strict";
    function toast(text) {
        message(text);
    }
    function test(libraryName) {
        const library = libByName(libraryName);
        const entries = library.entries();
        toast(entries.length.toString());
    }
    var index = Object.freeze({
        test: test,
        toast: toast
    });
    return index;
}();
