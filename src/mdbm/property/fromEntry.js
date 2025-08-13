/*jslint beta*/
/*global*/

function fromEntry(propertyEntry) {
    const label = () => propertyEntry.field("Label");
    const value = () => propertyEntry.field("Value");
    return Object.freeze({
        label,
        value
    });
}

export {
    fromEntry
};
