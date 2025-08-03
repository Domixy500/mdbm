var mdbm = function(exports) {
    "use strict";
    const notify = function(text) {
        message(text);
        log(text);
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
    exports.property = property;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
