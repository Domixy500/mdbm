/*jslint beta*/
/*global*/

function addProperty(base, property) {
    base[property.label] = property.value;
    return base;
}

export {
    addProperty
};
