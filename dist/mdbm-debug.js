var mdbm = function(exports) {
    "use strict";
    function addProperty(base, e) {
        const label = e.field("Label");
        const value = () => e.field("Value");
        base[label] = value;
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
    function properties(e) {
        return e.linksFrom("Property", "Object");
    }
    function fromEntry(e) {
        const object = properties(e).reduce(addProperty, baseObject(e));
        return object;
    }
    const object = {
        fromEntry: fromEntry
    };
    exports.object = object;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
