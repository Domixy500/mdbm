var mdbm = function() {
    "use strict";
    function hello() {
        message("Hello World!");
    }
    function entries() {
        return libByName("mdbm.Type").entries();
    }
    function find(name) {
        return entries().find(e => e.field("Name") === name);
    }
    function exists(name) {
        return find(name) !== undefined;
    }
    function isMissing(name) {
        return !exists(name);
    }
    var type = Object.freeze({
        __proto__: null,
        isMissing: isMissing
    });
    var index = Object.freeze({
        hello: hello,
        type: type
    });
    return index;
}();
//# sourceMappingURL=mdbm.debug.js.map
