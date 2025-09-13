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
    return libByName("ObjectLink").create({});
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
