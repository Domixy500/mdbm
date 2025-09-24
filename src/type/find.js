/*jslint beta*/
/*global
    libByName
*/

// import {entries} from "./entries";

function find(typeName) {
    return libByName("mdbm.Type").findByKey(typeName);
    // return entries().find(
    //     (e) => e.field("Name") === name
    // );
}

export {
    find
};
