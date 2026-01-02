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
    function create(name, baseType) {
        if (exists(name)) {
            throw messages.existsAlready(typeName);
        }
        return createType(typeName, baseType);
    }
    function createType(typeName, baseType) {
        const typeEntry = library.createEntry("mdbm.Type");
        typeEntry.set("Name", typeName);
        if (baseType === undefined) {
            onCreate.open(typeEntry);
        } else {
            typeEntry.set("hasTypes", baseType.field("hasTypes"));
            typeEntry.set("DisplayName", baseType.field("DisplayName"));
        }
        onCreate.post(typeEntry);
        return typeEntry;
    }
    function isMissing(name) {
        return !exists(name);
    }
    function id(typeEntry) {
        return typeEntry.id;
    }
    function name(typeEntry) {
        return typeEntry.field("Name");
    }
    function fromEntry(typeEntry) {
        return Object.freeze({
            id: () => id(typeEntry),
            name: () => name(typeEntry)
        });
    }
    var type = Object.freeze({
        __proto__: null,
        create: create,
        fromEntry: fromEntry,
        isMissing: isMissing
    });
    var index = Object.freeze({
        hello: hello,
        type: type
    });
    return index;
}();
//# sourceMappingURL=mdbm.debug.js.map
