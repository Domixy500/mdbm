/*jslint beta*/
/*global*/

import {type} from "@type";

function displayName(e) {
    const template = type.fromObjectEntry(e).field("DisplayNamePattern");
    const value = template.replace(
        /\$\{(.*?)\}/g,
        (ignore, key) => getVal(e, key)
    );
    e.set("mdbm.DisplayName", value);
    return value;
}

function getVal(e, key) {
    return e.field(key);
}

export {
    displayName
};
