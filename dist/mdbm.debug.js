var mdbm = function() {
    "use strict";
    function hello() {
        message("Hello World!");
    }
    var index = Object.freeze({
        hello: hello
    });
    return index;
}();
//# sourceMappingURL=mdbm.debug.js.map
