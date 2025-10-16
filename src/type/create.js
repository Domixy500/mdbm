/*jslint beta*/
/*global
    libByName
*/

import {onCreate} from "./onCreate";

function create(typeName, baseTypeName) {
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
