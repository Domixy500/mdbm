/*jslint*/
/*global
    libByName
    message
    R
    sql
*/

const mdbm = (function () {
    const data = Object.create(null);
    const interfaceQuery = R.curry(
        function (id, type) {
            const select = "SELECT id FROM \"";
            return select.concat(
                type,
                "\" WHERE \"mdbm.id\" = \"",
                id,
                "\""
            );
        }
    );

    function entriesBySql(query) {
        return sql(query).asEntries();
    }

    function entryBySql(query) {
        return entriesBySql(query)[0];
    }

    function generateId() {
        const lastId = settings().field("lastId");
        const nextId = lastId + 1;
        settings().set("lastId", nextId);
        return nextId.toString(36);
    }

    function interfaceNames(e) {
        log(new Array(e.field("mdbm.interfaces")))
        return new Array(e.field("mdbm.interfaces"));
    }

    function interfaces(e) {
        const id = e.field("mdbm.id");
        return R.pipe(
            interfaceNames,
            R.map(interfaceQuery(id))
            //R.map(entryBySql)
        )(e);
    }

    function settings() {
        return data.settings || libByName("mdbm").entries()[0];
    }

    return Object.freeze({
        "generateId": generateId,
        "interfaces": interfaces
    });
}());
