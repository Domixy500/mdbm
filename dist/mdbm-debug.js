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
    const type = {
        create: create,
        entries: entries,
        exists: exists,
        find: find,
        isMissing: isMissing
    };
    const onOpen = {
        post: post
    };
    function post(library) {
        checkAccess();
        if (type.isMissing(library.title)) {
            throw "Type '" + library.title + "' is not defined!";
        }
    }
    const library = {
        onOpen: onOpen
    };
    const onCreate = {
        open: open
    };
    function open(e) {
        const library = lib();
        if (type.isMissing(library.title)) {
            library.show();
        }
    }
    const object = {
        onCreate: onCreate
    };
    exports.library = library;
    exports.object = object;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
