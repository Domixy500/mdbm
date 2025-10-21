/*jslint beta*/
/*global
    libByName
*/

import {exists} from "./exists";
import {library} from "@library";
import {messages} from "./messages";
import {onCreate} from "./onCreate";

function create(typeName, baseType) {
    if (exists(typeName)) {
        throw messages.existsAlready(typeName);
    }
    return createType(typeName, baseType);
}

function createType(typeName, baseType) {
    const typeEntry = library.createEntry("mdbm.Type");
    typeEntry.set("Name", typeName);
    if (baseType === undefined) {
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
