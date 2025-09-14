/*jslint beta*/
/*global
    libByName
*/

const type = {
    fromName,
    link
};

function fromName(typeName) {
    return types().find(
        (e) => e.field("Name") === typeName
    );
}

function link(e, typeName) {
    const mdbmType = fromName(typeName);
    e.set("mdbm.Type", mdbmType);
}

function types() {
    return libByName("mdbm.Type").entries();
}

export {
    type
};
