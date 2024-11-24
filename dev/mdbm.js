/*jslint*/
/*global
    libByName
    R
    query
*/

const mdbm = (function () {
    const query = (function () {
        const definitions = {
            byIdType: {
                pattern: "SELECT id FROM \"${type}\" WHERE \"mdbmId\" = \"${id}\"", //jslint-ignore-line
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
            const id = e.field("mdbmId");
            return R.pipe(
                interfaceNames,
                R.map(query.byIdType(id))
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
