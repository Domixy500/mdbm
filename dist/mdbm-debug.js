var mdbm = function(exports) {
    "use strict";
    const onCreate = {
        open: open,
        post: post
    };
    function createObjectLink(libraryEntry) {
        const linkEntry = libByName("ObjectLink").create({});
        linkEntry.set("Object", [ libraryEntry ]);
        return linkEntry;
    }
    function open(libraryEntry) {
        libraryEntry.set("Type", lib().title);
        return libraryEntry;
    }
    function post(libraryEntry) {
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
    exports.object = object;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
