var mdbm = function(exports) {
    "use strict";
    function notify(text) {
        message(text);
        log(text);
    }
    function createEntry(libraryName) {
        return libByName(libraryName).create({});
    }
    function type(e) {
        return e.field("Type");
    }
    function value(e, newValue) {
        const propertyType = type(e);
        if (newValue !== undefined) {
            e.set(propertyType, newValue);
        }
        return e.field(propertyType);
    }
    const stringConverter = {
        multiLine: value,
        singleLine: value
    };
    function hasConverter(key) {
        return Object.keys(stringConverter).includes(key);
    }
    function valueAsString(e) {
        const propertyType = type(e);
        return hasConverter(propertyType) ? stringConverter[propertyType](e) : propertyType;
    }
    function fromEntry(e) {
        const property = {
            type: () => type(e),
            value: newValue => value(e, newValue),
            valueAsString: () => valueAsString(e)
        };
        return Object.freeze({
            property: property
        });
    }
    const property = {
        fromEntry: fromEntry,
        type: type,
        value: value,
        valueAsString: valueAsString
    };
    function createObject(prototype) {
        const object = createEntry("Object");
        prototype.field("Attributes");
        addTypes(object, prototype);
        setPrototype(object, prototype);
    }
    function setPrototype(object, prototype) {
        object.set("Prototype", [ prototype ]);
    }
    const prototype = {
        createObject: createObject
    };
    exports.notify = notify;
    exports.property = property;
    exports.prototype = prototype;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
