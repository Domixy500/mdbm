var mdbm = function(exports) {
    "use strict";
    function notify(text) {
        message(text);
        log(text);
    }
    function createEntry(libraryName) {
        return libByName(libraryName).create({});
    }
    function addType(object, prototype) {
        const basedOn = prototype.field("basedOn");
        object.link("Type", prototype);
        if (basedOn.length === 1) {
            addType(object, basedOn[0]);
        }
    }
    function fromPrototype(prototype) {
        prototype.field("Attributes");
        const object = createEntry("Object");
        addType(object, prototype);
        setPrototype(object, prototype);
        return object;
    }
    function setPrototype(object, prototype) {
        object.set("Prototype", [ prototype ]);
    }
    const create = {
        fromPrototype: fromPrototype
    };
    const object = {
        create: create
    };
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
    exports.notify = notify;
    exports.object = object;
    exports.property = property;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
