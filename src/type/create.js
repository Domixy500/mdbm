/*jslint beta*/
/*global
    libByName
*/

import {onCreate} from "./onCreate";

function create(typeName, baseType) {
    const typeEntry = libByName("mdbm.Type").create({});
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
