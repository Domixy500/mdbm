/*jslint beta*/
/*global*/

function addProperty(base, e) {
    const label = e.field("Label");
    const value = () => e.field("Value");
    base[label] = value;
    return base;
}

export {
    addProperty
};
