/*jslint beta*/
/*global*/

import {property} from "../property";

function properties(objectEntry) {
    const propertyEntries = objectEntry.linksFrom("Property", "Object");
    return propertyEntries.map(
        property.fromEntry
    );
}

export {
    properties
};
