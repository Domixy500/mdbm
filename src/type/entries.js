/*jslint beta*/
/*global
    libByName
*/

function entries() {
    return libByName("mdbm.Type").entries();
}

export {
    entries
};
