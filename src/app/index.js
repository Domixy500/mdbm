/*jslint beta*/
/*global
    log
    message
*/

function notify(text) {
    message(text);
    log(text);
};

function createEntry(libraryName) {
    return libByName(
        libraryName
    ).create({});
}

export {
    createEntry,
    notify
};
