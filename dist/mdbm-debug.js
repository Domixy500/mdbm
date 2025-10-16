var mdbm = function(exports) {
    "use strict";
    function checkAccess() {
        libByName("Object");
        libByName("mdbm.Type");
    }
    function entries() {
        return libByName("mdbm.Type").entries();
    }
    function find(typeName) {
        return entries().find(e => e.field("Name") === typeName);
    }
    function exists(typeName) {
        return find(typeName) !== undefined;
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
    function addType(typeEntry, typeName) {
        const hasTypes = typeEntry.field("hasTypes");
        const hasTypeNames = hasTypes.map(e => e.field("Name"));
        if (!hasTypeNames.includes(typeName)) {
            typeEntry.link("hasTypes", find(typeName));
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
        addType(e, "Object");
        addType(e, e.field("Name"));
        return e;
    }
    function create(typeName, baseTypeName) {
        const typeEntry = libByName("mdbm.Type").create({});
        typeEntry.set("Name", typeName);
        if (baseTypeName === undefined) {
            onCreate$1.open(typeEntry);
        } else {
            typeEntry.set("hasTypes", baseType.field("hasTypes"));
        }
        onCreate$1.post(typeEntry);
        return typeEntry;
    }
    const type = {
        check: check,
        create: create,
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
