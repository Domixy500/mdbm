var mdbm = function(exports) {
    "use strict";
    function checkAccess() {
        libByName("Object");
        libByName("mdbm.Type");
    }
    function find(typeName) {
        return libByName("mdbm.Type").findByKey(typeName);
    }
    function exists(typeName) {
        return find(typeName) !== null;
    }
    function isMissing(name) {
        return !exists(name);
    }
    const msg = {
        isMissing: x => "Type '" + x + "' does not exist!"
    };
    function check(typeName) {
        if (isMissing(typeName)) {
            throw msg.isMissing(typeName);
        }
    }
    const type = {
        check: check
    };
    const onOpen = {
        post: post$1
    };
    function post$1(library) {
        checkAccess();
        if (type.isMissing(library.title)) {
            message("Type '" + library.title + "' is not defined!");
        }
    }
    const library = {
        onOpen: onOpen
    };
    const onCreate = {
        open: open,
        post: post
    };
    function open(e) {}
    function post(e) {}
    const object = {
        onCreate: onCreate
    };
    exports.library = library;
    exports.object = object;
    exports.type = type;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
