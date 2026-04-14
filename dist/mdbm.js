var mdbm = function() {
    "use strict";
    function createEntry(libraryName) {
        const library = libByName(libraryName);
        const newEntry = library.create({});
        return newEntry;
    }
    function assignEmptyString(acc, key) {
        acc[key] = "";
        return acc;
    }
    function stringDictFromKeys(keys) {
        return keys.reduce(assignEmptyString, {});
    }
    function typeEntry(typeName) {
        const library = libByName("ObjectType");
        return library.findByKey(typeName);
    }
    function types(typeName) {
        return typeEntry(typeName).field("Types");
    }
    function emptyIds(typeName) {
        const keys = typeNames(typeName);
        return stringDictFromKeys(keys);
    }
    function typeNames(typeName) {
        return types(typeName).map(x => x.name);
    }
    var objectType = Object.freeze({
        emptyIds: emptyIds
    });
    function fromEntry(baseEntry, typeName) {
        const ids = objectType.emptyIds(typeName);
        log(ids.toString());
        ids[typeName] = baseEntry.id;
        log(JSON.stringify(ids, null, 2));
        Object.keys(ids).forEach(function(key) {
            if (ids[key] !== "") {
                ids[key] = createEntry(key).id;
            }
        });
        log(JSON.stringify(ids, null, 2));
    }
    var create = Object.freeze({
        __proto__: null,
        fromEntry: fromEntry
    });
    var object = Object.freeze({
        create: create
    });
    var index = Object.freeze({
        object: object
    });
    return index;
}();
