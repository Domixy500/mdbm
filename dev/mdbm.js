/*jslint*/
/*global
    libByName
    message
    R
    sql
*/

const mdbm = (function () {
    const query = (function () {
        const definition = {
            "byIdType": {
                parameters: function (id, type) {
                    return {"id": id, "type": type};
                },
                pattern: "SELECT id FROM \"${type}\""
                + " WHERE \"mdbm.id\" = \"${id}\""
            }
        };

        const template = R.curry(function (pattern, values) {
            const regex = new RegExp("\\$\\{(.*?)\\}", "g");
            return pattern.replace(
                regex,
                (match, key) => values[key] || match
            );
        });

        function makeQuery(queryDefinition) {
            const {
                parameters,
                pattern
            } = queryDefinition;

            return template(pattern)(parameters);
        }

        // function makeQuery(queryDefinition) {
        //     const {
        //         parameters,
        //         pattern
        //     } = queryDefinition;
        //     const numberOfParameters = parameters.length;

        //     return R.curryN(numberOfParameters, function (...values) {
        //         return template(
        //             pattern,
        //             parameters(...values)
        //         );
        //     });
        // }

        return R.map(makeQuery, definition);
    }());

    return Object.freeze({
        "query": query
    });
}());
