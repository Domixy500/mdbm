/*jslint*/
/*global
    R
*/

const query = (function () {
    const definitions = {
        byIdType: {
            pattern: "SELECT id FROM \"${type}\" WHERE \"mdbm.id\" = \"${id}\"",
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

    return R.map(queryFrom, definitions);
}());

function template(pattern) {
    return function (values) {
        const regex = new RegExp("\\$\\{(.*?)\\}", "g");
        const replacer = function (match, key) {
            return values[key] || match;
        };

        return pattern.replace(regex, replacer);
    };
}
