/*jslint beta*/
/*global*/

import {find} from "./find";

function emptyIds(typeName) {
    const typeEntry = find(typeName);
    const types = typeEntry.field("hasTypes");
    const typeNames = types.map(
        (x) => x.field("Name")
    );
    const ids = Object.create(null);
    typeNames.forEach(
        (x) => ids[x] = null
    );
    return ids;
}

export {
    emptyIds
};
