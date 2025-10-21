/*jslint beta*/
/*global*/

import {json} from "@common/json";
import {type} from "@type";
import {typeName} from "./typeName";

const ids = {
    get,
    getAll,
    set,
    setAll,
    setEmpty
};

function get(e, typeName) {
    return getAll(e)[typeName];
}

function getAll(e) {
    return json.parse(
        e.field("mdbm.Ids")
    );
}

function setEmpty(e) {
    const ids = type.emptyIds(typeName(e));
    setAll(e, ids);
}

function setAll(e, ids) {
    e.set(
        "mdbm.Ids",
        json.stringify(ids)
    );
}

function set(e, typeName, value) {
    const ids = getAll(e);
    ids[typeName] = value;
    setAll(ids);
}

export {
    ids
};
