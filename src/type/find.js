/*jslint beta*/
/*global
    libByName
*/

import {entries} from "./entries";

function find(typeName) {
    return entries().find(
        (e) => e.field("Name") === typeName
    );
}

export {
    find
};
