var mdbm = function(exports) {
    "use strict";
    function linkWithObject(e) {
        const objectEntry = typeName(e) === "Object" ? e : newObjectEntry(e);
        e.set("mdbm.Object", objectEntry);
        e.set("mdbm.Id", objectEntry.field("mdbm.Id"));
    }
    function newObjectEntry(e) {
        const newObject = libByName("Object").create({});
        newObject.link("mdbm.Type", type$1(e));
        newObject.link("mdbm.Object", newObject);
        return newObject;
    }
    function type$1(e) {
        return e.field("mdbm.Type")[0];
    }
    function typeName(e) {
        return type$1(e).field("Name");
    }
    const type = {
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
    const onCreate = {
        open: open,
        post: post
    };
    function open(e) {
        type.link(e, lib().title);
    }
    function post(e) {
        linkWithObject(e);
    }
    const object = {
        onCreate: onCreate
    };
    exports.object = object;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
