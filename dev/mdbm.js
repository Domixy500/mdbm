/*jslint*/
/*global
    libByName
    R
*/

const mdbm = (function () {
    const mdbmObject = (function () {
        function afterCreation(e) {
            e.set("mdbmId", nextId());
            return e;
        }
        
        function displayName2(e) {
            return e.field("mdbmId") + " - " + e.field("Name2") + " - " + e.field("Name");
        }
        
        function displayName(e) {
            const body = e.field("mdbmDisplayName");
            const calculateDisplayName = new Function("o", body); //jslint-ignore-line
            return calculateDisplayName;
        }

        return Object.freeze({
            "afterCreation": afterCreation,
            "displayName": displayName
        });
    }());
    const query = (function () {
        const definitions = {
            byIdType: {
                pattern: "SELECT id FROM \"${type}\" WHERE \"mdbm.id\" = \"${id}\"", //jslint-ignore-line
                values: function (id, type) {
                    return {"id": id, "type": type};
                }
            }
        };

        const makeQuery = (template, values) => R.curry(R.pipe(
            values,
            template
        ));

        const queryFrom = function (definition) {
            const {pattern, values} = definition;
            return makeQuery(
                template(pattern),
                values
            );
        };

        return Object.freeze(
            R.map(queryFrom, definitions)
        );
    }());

    function nextId() {
        const id = settings().field("lastId") + 1;
        settings().set("lastId", id);
        return id.toString(36);
    }

    function settings() {
        return libByName("mdbm").entries()[0];
    }

    function template(pattern) {
        return function (values) {
            const regex = new RegExp("\\$\\{(.*?)\\}", "g");
            const replacer = function (match, key) {
                return values[key] || match;
            };

            return pattern.replace(regex, replacer);
        };
    }


    return Object.freeze({
        "object": mdbmObject,
        "query": query
    });
}());
