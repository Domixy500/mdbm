var mdbm = function(exports) {
    "use strict";
    function addProperty(base, property) {
        base[property.label] = property.value;
        return base;
    }
    function id(e) {
        return e.field("Id");
    }
    function baseObject(e) {
        return {
            id: () => id(e)
        };
    }
    function fromEntry$1(propertyEntry) {
        const label = () => propertyEntry.field("Label");
        const value = () => propertyEntry.field("Value");
        return Object.freeze({
            label: label,
            value: value
        });
    }
    const property = {
        fromEntry: fromEntry$1
    };
    function properties(objectEntry) {
        const propertyEntries = objectEntry.linksFrom("Property", "Object");
        return propertyEntries.map(property.fromEntry);
    }
    function fromEntry(objectEntry) {
        const object = properties(objectEntry).reduce(addProperty, baseObject(objectEntry));
        return object;
    }
    const object = {
        fromEntry: fromEntry
    };
    exports.object = object;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
