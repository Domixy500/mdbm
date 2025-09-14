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
    const onLink = {
        post: post
    };
    function classOf(object) {
        return Object.prototype.toString.call(object).slice(8, -1);
    }
    function hasLinkedEntries([ignore, field]) {
        if (isList(field)) {
            if (field.length > 0) {
                return isEntry(field[0]);
            }
        }
        return false;
    }
    function isClass(object, className) {
        return classOf(object) === className;
    }
    function isEntry(object) {
        return isClass(object, "Entry");
    }
    function isList(object) {
        return isClass(object, "ScriptableList");
    }
    function linkData() {
        const data = {
            linked: {
                entry: entry()
            },
            master: {
                entry: masterEntry(),
                field: masterField(),
                library: masterLib()
            }
        };
        data.master.fieldName = masterFieldName(data);
        return data;
    }
    function masterFieldName(data) {
        const fieldNames = data.master.library.fields();
        fieldNames.map(x => [ x, data.master.entry.field(x) ]).filter(hasLinkedEntries);
    }
    function post() {
        linkData();
    }
    const objectLink = {
        onLink: onLink
    };
    exports.object = object;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
