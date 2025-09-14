/*jslint beta*/
/*global
    libByName
*/

function linkWithObject(e) {
    const objectEntry = (
        typeName(e) === "Object"
        ? e
        : newObjectEntry(e)
    );
    e.set(
        "mdbm.Object",
        objectEntry
    );
    e.set(
        "mdbm.Id",
        objectEntry.field("mdbm.Id")
    );
}

function newObjectEntry(e) {
    const newObject = libByName("Object").create({});
    newObject.link("mdbm.Type", type(e));
    newObject.link("mdbm.Object", newObject);
    return newObject;
}

function type(e) {
    return e.field("mdbm.Type")[0];
}

function typeName(e) {
    return type(e).field("Name");
}

export {
    linkWithObject
};
