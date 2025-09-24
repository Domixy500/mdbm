/*jslint beta*/
/*global*/

// import {entries} from "./entries";
import {find} from "./find";

function exists(typeName) {
    return find(typeName) !== null;
    // return entries().some(
    //     (e) => e.field("Name") === name
    // );
}

export {
    exists
};
