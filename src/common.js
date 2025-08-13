/*jslint beta*/
/*global*/

function emptyObject() {
    return Object.create(null);
}

function mergeAndFreeze(...objects) {
    return Object.freeze(
        mergeRight(...objects)
    );
}

function mergeRight(...objects) {
    return Object.assign(
        emptyObject(),
        ...objects
    );
}

export {
    emptyObject,
    mergeAndFreeze
};