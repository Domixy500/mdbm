/*jslint indent2*/
/*global
    R
*/

const query = (function () {
    const definitions = {
        byIdType: {
            values: function (id, type) {
                return {"id": id, "type": type};
            },
            pattern: "SELECT id FROM \"${type}\" WHERE \"mdbm.id\" = \"${id}\""
        }
    };

    const make = (template, values) => R.curry(R.pipe(
        values,
        template
    ));

    const from = function (definition) {
        const {pattern, values} = definition;
        return make(
          makeTemplate(pattern),
          values
        );
    };

    return R.map(from, definition);
}());

const makeTemplate = R.curry(function (pattern, values) {
    const regex = new RegExp("\\$\\{(.*?)\\}", "g");
    const replacer = function (match, key) {
      return values[key] || match;
    };
    
    return pattern.replace(
        regex,
        replacer
    );
});