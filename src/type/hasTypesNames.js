/*jslint beta*/
/*global*/

import {find} from "./find";

function hasTypesNames(typeName) {
    const hasTypes = find(typeName).field("hasTypes");
    return hasTypes.map(
        (x) => x.field("Name")
    );
}

export {
    hasTypesNames
};
