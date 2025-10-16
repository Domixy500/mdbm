/*jslint beta*/
/*global
    libByName
*/

import {exists} from "./exists";
import {messages} from "./messages";
import {onCreate} from "./onCreate";

function create(typeName, baseTypeName) {
    if (exists(typeName)) {
        throw messages.existsAlready(typeName);
    }
    return createType(typeName, baseTypeName);
}

function createType(typeName, baseTypeName) {
    const typeEntry = libByName("mdbm.Type").create({});
    typeEntry.set("Name", typeName);
    if (baseTypeName === undefined) {
        onCreate.open(typeEntry);
    } else {
        typeEntry.set(
            "hasTypes",
            baseType.field("hasTypes")
        );
    }
    onCreate.post(typeEntry);
    return typeEntry;
}

export {
    create
};
