var mdbm = function(exports) {
    "use strict";
    const onCreate = {
        open: open,
        post: post$1
    };
    function createObjectLink(libraryEntry) {
        const linkEntry = libByName("ObjectLink").create({});
        linkEntry.link("Object", libraryEntry);
        linkEntry.set("libraryName", libraryEntry.field("libraryName"));
        return linkEntry;
    }
    function open(libraryEntry) {
        libraryEntry.set("libraryName", lib().title);
        return libraryEntry;
    }
    function post$1(libraryEntry) {
        createObjectLink(libraryEntry);
        return libraryEntry;
    }
    function create(libraryName) {
        const object = libByName(libraryName).create({
            libraryName: libraryName
        });
        return onCreate.post(object);
    }
    const object = {
        create: create,
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
    exports.objectLink = objectLink;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
