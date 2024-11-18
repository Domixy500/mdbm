/*jslint*/
/*global
    libByName
    message
    R
    sql
*/

const mdbm = (function () {
    const data = Object.create(null);
    const template = R.curry(function (pattern, values) {
        const regex = new RegExp("\\$\\{(.*?)\\}", "g");
        return pattern.replace(
            regex,
            (notUsed, key) => values[key] || ""
        );
    });
    const query = R.map(template, {
        "byIdType": "SELECT id FROM \"${type}\" WHERE \"mdbm.id\" = \"${id}\""
    });
    const interfaceQuery = R.curry(
        (id, type) => query.byIdType({
            "id": id,
            "type": type
        })
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
        return R.map(
            R.identity,
            e.field("mdbm.interfaces")
        );
    }

    function interfaces(e) {
        const id = e.field("mdbm.id");
        return R.pipe(
            interfaceNames,
            R.map(interfaceQuery(id)),
            R.map(findOrCreateInterface(id))
        )(e);
    }

    function settings() {
        return data.settings || libByName("mdbm").entries()[0];
    }

    return Object.freeze({
        "generateId": generateId,
        "interfaces": interfaces,
        "query": query
    });
}());
