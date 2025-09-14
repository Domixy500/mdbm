/*jslint beta*/
/*global
    libByName
*/

function create(name, basedOn) {
    const type = libByName("mdbm.Type").create({});
    type.set("Name", name);
    if (basedOn !== undefined) {
        type.set("hasTypes", basedOn.field("hasTypes"));
    }
    type.link("hasTypes", type);
    return type;
}

export {
    create
};
