var mdbm = function(exports) {
    "use strict";
    const type = {
        fromName: fromName
    };
    function fromName(typeName) {
        return types.find(e => e.field("Name") === typeName);
    }
    function types() {
        return libByName("mdbm.Type").entries();
    }
    const onCreate = {
        open: open,
        post: post,
        pre: pre
    };
    function open(e) {
        setMdbmType(e, lib().title);
    }
    function post() {}
    function pre(e) {}
    function setMdbmType(e, typeName) {
        const mdbmType = type.fromName(typeName);
        e.set("mdbm.Type", mdbmType);
    }
    const object = {
        onCreate: onCreate
    };
    exports.object = object;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
