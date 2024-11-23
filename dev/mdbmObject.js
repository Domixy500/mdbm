/*jslint*/
/*global
    libByName
*/

const mdbmObject = (function () {
    function afterCreation(e) {
        e.set("mdbmId", nextId());
        return e;
    }

    function displayName(e) {
        const calculateDisplayName = new Function("o", e.field("mdbmDisplayName")); //jslint-ignore-line
        return calculateDisplayName(e);
    }

    return Object.freeze({
        "afterCreation": afterCreation,
        "displayName": displayName
    });
}());

function nextId() {
    const id = settings().field("lastId") + 1;
    settings().set("lastId", id);
    return id.toString(36);
}

function settings() {
    return libByName("mdbm").entries()[0];
}
