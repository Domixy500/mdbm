/*jslint*/
/*global*/

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
