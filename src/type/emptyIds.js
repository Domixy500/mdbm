/*jslint beta*/
/*global*/

import {find} from "./find";

function emptyIds(typeName) {
    const typeEntry = find(typeName);
    const types = typeEntry.field("hasTypes");
    const entries = types.map(
        (x) => [x.field("Name"), null]
    );
    return Object.fromEntries(entries);
}

export {
    emptyIds
};
