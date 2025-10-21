/*jslint beta*/
/*global*/

import {json} from "@common/json";
import {type} from "@type";
import {typeName} from "./typeName";

const ids = {
    addMissing,
    createMissing,
    get,
    getAll,
    set,
    setAll,
    setEmpty,
    setSelf
};

function addMissing(e) {
    const entryIds = Object.assign(
        Object.create(null),
        type.emptyIds(typeName(e)),
        getAll(e)
    );
    setAll(e, entryIds);
    
}

function createMissing(e) {
    const entryIds = getAll(e);
    const libNames = Object.keys(entryIds);
    libNames.forEach(addMissingEntry);
    setAll(e, entryIds);
    
    function addMissingEntry(libraryName) {
        if (entryIds[libraryName] === null) {
            const libEntry = libByName(libraryName).create({});
            entryIds[libraryName] = libEntry.id;
        }
    }
}

function get(e, libName) {
    return getAll(e)[libName];
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

function setSelf(e) {
    set(e, typeName(e), e.id);
}

function set(e, libName, value) {
    const ids = getAll(e);
    ids[libName] = value;
    setAll(e, ids);
}

export {
    ids
};
