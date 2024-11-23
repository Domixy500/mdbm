/*jslint*/
/*global
    libByName
*/

const mdbmObject = (function () {
    function afterCreation(e) {
        e.set("mdbmId", nextId());
    }

    return Object.freeze({
        "afterCreation": afterCreation
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
