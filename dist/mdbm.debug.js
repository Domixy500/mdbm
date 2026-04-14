var mdbm = function() {
    "use strict";
    function assignEmptyString(acc, key) {
        acc[key] = "";
        return acc;
    }
    function stringDictFromKeys(keys) {
        return keys.reduce(assignEmptyString, {});
    }
    function toJson(object) {
        return JSON.stringify(object, null, 2);
    }
    function createEntry(libraryName) {
        const library = libByName(libraryName);
        const newEntry = library.create({});
        return newEntry;
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
        ids[typeName] = baseEntry.id;
        Object.keys(ids).forEach(function(key) {
            if (ids[key] === "") {
                ids[key] = createEntry(key).id;
            }
        });
        baseEntry.set("mdbm.Ids", toJson(ids));
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
