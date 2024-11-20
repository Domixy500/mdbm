/*jslint*/
/*global
    R
*/

const query = (function () {
    const definition = {
        byIdType: {
            parameters: function (id, type) {
                return {"id": id, "type": type};
            },
            pattern: "SELECT id FROM \"${type}\" WHERE \"mdbm.id\" = \"${id}\""
        }
    };
    const template = R.curry(function (pattern, values) {
        const regex = new RegExp("\\$\\{(.*?)\\}", "g");
        return pattern.replace(
            regex,
            (match, key) => values[key] || match
        );
    });

    const q = (t, values) => R.curry(R.pipe(
        values,
        t
    ));
    const qFromDef = function (def) {
        return q(template(def.pattern), def.parameters);
    };

    return R.map(qFromDef, definition);
}());
