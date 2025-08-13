/*jslint beta*/
/*global*/

function fromEntry(propertyEntry) {
    const label = () => label(propertyEntry);
    const value = () => propertyEntry.field("Value");
    return Object.freeze({
        label,
        value
    });
}

export {
    fromEntry
};
