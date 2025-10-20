/*jslint beta*/
/*global*/

import {find} from "./find";

function idsObject(typeName) {
    const typeEntry = find(typeName);
    const types = typeEntry.field("hasTypes");
    const entries = types.map(
        (x) => [x.field("Name"), null]
    );
    return Object.fromEntries(entries);
}

export {
    idsObject
};
