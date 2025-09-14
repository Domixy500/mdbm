/*jslint beta*/
/*global*/

import {entries} from "./entries";

function find(name) {
    return entries().find(
        (e) => e.field("Name") === name
    );
}

export {
    find
};
