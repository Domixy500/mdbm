/*jslint*/
/*global
    libByName
    R
*/

const mdbmObject = (function () {
    function afterCreation(e) {
        interfaces(e);
        return e;
    }

    function beforeCreation(e) {
        e.set("mdbmId", nextId());
        return e;
    }

    function displayName(e) {
        const body = e.field("mdbmDisplayName");
        const calculateDisplayName = new Function("o", body); //jslint-ignore-line
        return calculateDisplayName(e);
    }

    function interfaceNames(e) {
        return R.map(
            R.identity,
            e.field("mdbmInterfaces")
        );
    }

    function interfaces(e) {
        const id = e.field("mdbm.id");
        return R.pipe(
            interfaceNames
            //R.map(interfaceQuery(id)),
            //R.map(findOrCreateInterface(id))
        );
    }

    return Object.freeze({
        "afterCreation": afterCreation,
        "beforeCreation": beforeCreation,
        "displayName": displayName,
        "interfaces": interfaces
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
