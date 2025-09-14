/*jslint beta*/
/*global
    libByName
*/

const type = {
    fromName
};

function fromName(typeName) {
    return types().find(
        (e) => e.field("Name") === typeName
    );
}

function types() {
    return libByName("mdbm.Type").entries();
}

export {
    type
};
