/*jslint beta*/
/*global*/

import {find} from "./find";

function addType(typeEntry, typeName) {
    const hasTypes = typeEntry.field("hasTypes");
    const hasTypeNames = hasTypes.map(
        (x) => e.field("Name")
    );
    if (hasTypeNames.includes(typeName)) {
        typeEntry.link(
            "hasTypes",
            find(typeName)
        );
    }
}

export {
    addType
};
