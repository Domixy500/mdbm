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
    function post() {
        message(masterField());
    }
    const objectLink = {
        onLink: onLink
    };
    exports.object = object;
    exports.objectLink = objectLink;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
