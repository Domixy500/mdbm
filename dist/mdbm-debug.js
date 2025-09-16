var mdbm = function(exports) {
    "use strict";
    function checkAccess() {
        libByName("Object");
        libByName("mdbm.Type");
    }
    function create(name, basedOn) {
        const type = libByName("mdbm.Type").create({});
        type.set("Name", name);
        if (basedOn !== undefined) {
            type.set("hasTypes", basedOn.field("hasTypes"));
        }
        type.link("hasTypes", type);
        return type;
    }
    function entries() {
        return libByName("mdbm.Type").entries();
    }
    function exists(name) {
        return entries().some(e => e.field("Name") === name);
    }
    function find(name) {
        return entries().find(e => e.field("Name") === name);
    }
    function isMissing(name) {
        return !exists(name);
    }
    const onCreate$1 = {
        open: open$1,
        post: post$2
    };
    function open$1(e) {
        e.set("hasTypes", find("Object"));
    }
    function post$2(e) {
        e.link("hasTypes", find("Object"));
        return e;
    }
    const type = {
        create: create,
        entries: entries,
        exists: exists,
        find: find,
        isMissing: isMissing,
        onCreate: onCreate$1
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
