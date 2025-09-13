/*jslint beta*/
/*global
    lib
    libByName
*/

const onCreate = {
    open,
    post
};

function createObjectLink(libraryEntry) {
    const linkEntry = libByName("ObjectLink").create({});
    linkEntry.set("Object", libraryEntry);
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

export {
    onCreate
};
