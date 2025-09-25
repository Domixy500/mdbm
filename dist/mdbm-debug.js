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
    function create(typeName, baseType) {
        const typeEntry = libByName("mdbm.Type").create({});
        typeEntry.set("Name", typeName);
        if (baseType === undefined) {
            onCreate$1.open(typeEntry);
        } else {
            typeEntry.set("hasTypes", baseType.field("hasTypes"));
        }
        return typeEntry;
    }
    const type = {
        check: check,
        create: create,
        isMissing: isMissing
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
