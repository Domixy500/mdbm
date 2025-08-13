/*jslint beta*/
/*global*/

function fromEntry(propertyEntry) {
    // const label = () => label(propertyEntry);
    // const value = () => propertyEntry.field("Value");
    return Object.freeze({
        label: () => label(propertyEntry),
        value: () => value(propertyEntry)
    });
}

function label(propertyEntry) {
    return propertyEntry.field("Label");
}

function value(propertyEntry) {
    return propertyEntry.field("Value");
}

export {
    fromEntry
};
