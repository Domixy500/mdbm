var mdbm = function(exports) {
    "use strict";
    const type$1 = {
        fromName: fromName,
        link: link
    };
    function fromName(typeName) {
        return types().find(e => e.field("Name") === typeName);
    }
    function link(e, typeName) {
        const mdbmType = fromName(typeName);
        e.set("mdbm.Type", mdbmType);
    }
    function types() {
        return libByName("mdbm.Type").entries();
    }
    const onOpen = {
        post: post$1
    };
    function checkLibraryAccess() {
        libByName("Object");
        libByName("mdbm.Type");
    }
    function checkType() {
        const libraryName = lib().title;
        const libraryType = type$1.fromName(libraryName);
        if (libraryType === undefined) {
            createType(libraryName);
            message(`Type '${libraryName}' was created.`);
        }
    }
    function createType(libraryName) {
        const newType = libByName("mdbm.Type").create({});
        newType.set("Name", libraryName);
        return newType;
    }
    function post$1() {
        checkLibraryAccess();
        checkType();
    }
    const library = {
        onOpen: onOpen
    };
    function linkWithObject(e) {
        const objectEntry = typeName(e) === "Object" ? e : newObjectEntry(e);
        e.set("mdbm.Object", objectEntry);
        e.set("mdbm.Id", objectEntry.field("mdbm.Id"));
    }
    function newObjectEntry(e) {
        const newObject = libByName("Object").create({});
        newObject.link("mdbm.Type", type(e));
        newObject.link("mdbm.Object", newObject);
        return newObject;
    }
    function type(e) {
        return e.field("mdbm.Type")[0];
    }
    function typeName(e) {
        return type(e).field("Name");
    }
    const onCreate = {
        open: open,
        post: post
    };
    function open(e) {
        type$1.link(e, lib().title);
    }
    function post(e) {
        linkWithObject(e);
    }
    const object = {
        onCreate: onCreate
    };
    exports.library = library;
    exports.object = object;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
