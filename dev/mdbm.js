/*jslint*/
/*global
    libByName
    R
    query
*/

const mdbm = (function () {
    
    function replaceWith(values) {
        return function(match, key) {
            return values[key] || match;
        };
    }
    
    function template(pattern) {
        const regex = new RegExp("\\$\\{(.*?)\\}", "g");

        return function(values) {
            const replacer = replaceWith(values);
    
            return pattern.replace(
                regex,
                replacer
            );
        };
    }

    return Object.freeze({
        "object": {}
    });
}());
