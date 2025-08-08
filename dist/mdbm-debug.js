var mdbm = function(exports) {
    "use strict";
    function notify(text) {
        message(text);
        log(text);
    }
    function createEntry(libraryName) {
        return libByName(libraryName).create({});
    }
    function addAttribute(e, attr) {
        const property = libByName("Property").create({});
        property.set("Label", attr.field("Label"));
        property.set("Type", attr.field("Type"));
        property.set("Order", attr.field("Order"));
        property.link("Object", e);
    }
    function addType(object, prototype) {
        const basedOn = prototype.field("basedOn");
        object.link("Type", prototype);
        if (basedOn.length === 1) {
            addType(object, basedOn[0]);
        }
    }
    function fromPrototype(prototype) {
        const attributes = prototype.field("Attributes");
        const object = createEntry("Object");
        addType(object, prototype);
        setPrototype(object, prototype);
        attributes.forEach(x => addAttribute(object, x));
        return object;
    }
    function setPrototype(object, prototype) {
        object.set("Prototype", [ prototype ]);
    }
    const create = {
        fromPrototype: fromPrototype
    };
    function patternFromObject(e) {
        return e.field("DisplayNamePattern") || patternFromPrototype(e.field("Prototype")[0]);
    }
    function patternFromPrototype(e) {
        return e.field("DisplayNamePattern") || patternFromPrototype(e.field("basedOn")[0]);
    }
    function displayName(e) {
        const pattern = patternFromObject(e);
        const properties = e.linksFrom("Property", "Object");
        function replacer(_, fieldName) {
            const property = properties.filter(x => x.field("Label") === fieldName)[0];
            return property ? property.field("Value") : "";
        }
        return pattern.replace(/\$\{([^}]+)\}/g, replacer);
    }
    const object = {
        displayName: displayName,
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
