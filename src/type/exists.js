/*jslint beta*/
/*global*/

import {entries} from "./entries";

function exists(name) {
    return entries().some(
        (e) => e.field("Name") === name
    );
}

export {
    exists
};
