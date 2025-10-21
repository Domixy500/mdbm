/*jslint beta*/
/*global*/

import {common} from "@common";
import {library} from "@library";
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

const idsField = "mdbm.Ids";

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
            entryIds[libraryName] = library.createEntry(libraryName).id;
        }
    }
}

function get(e, libName) {
    return getAll(e)[libName];
}

function getAll(e) {
    return common.json.parse(
        e.field(idsField)
    );
}

function set(e, libName, value) {
    const entryIds = getAll(e);
    entryIds[libName] = value;
    setAll(e, entryIds);
}

function setAll(e, entryIds) {
    e.set(
        idsField,
        common.json.stringify(entryIds)
    );
}

function setEmpty(e) {
    const entryIds = type.emptyIds(typeName(e));
    setAll(e, entryIds);
}

function setSelf(e) {
    set(e, typeName(e), e.id);
}

export {
    ids
};
