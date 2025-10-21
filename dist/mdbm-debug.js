var mdbm = function(exports) {
    "use strict";
    function getLibrary(libraryName) {
        return libByName(libraryName);
    }
    function checkAccess() {
        getLibrary("Object");
        getLibrary("mdbm.Type");
    }
    function entries() {
        return libByName("mdbm.Type").entries();
    }
    function find(typeName) {
        return entries().find(e => e.field("Name") === typeName);
    }
    function exists(typeName) {
        return find(typeName) !== undefined;
    }
    function isMissing$1(name) {
        return !exists(name);
    }
    const onOpen = {
        post: post$3
    };
    function post$3(library) {
        checkAccess();
        if (isMissing$1(library.title)) {
            message("Type '" + library.title + "' is not defined!");
        }
    }
    const library = {
        get: getLibrary,
        onOpen: onOpen
    };
    const json = {
        parse: parse,
        stringify: stringify
    };
    function parse(jsonString) {
        return JSON.parse(jsonString);
    }
    function stringify(object) {
        return JSON.stringify(object, null, 2);
    }
    const common = {
        json: json
    };
    const messages = {
        alreadyExists: alreadyExists,
        isMissing: isMissing
    };
    function alreadyExists(x) {
        return "Type '" + x + "' does already exist!";
    }
    function isMissing(x) {
        return "Type '" + x + "' does not exist!";
    }
    function check(typeName) {
        if (isMissing$1(typeName)) {
            throw messages.isMissing(typeName);
        }
    }
    const hasTypesField = "hasTypes";
    function addType(typeEntry, typeName) {
        const hasTypeNames = hasTypes(typeEntry).map(e => e.field("Name"));
        if (!hasTypeNames.includes(typeName)) {
            typeEntry.link(hasTypesField, find(typeName));
        }
    }
    function hasTypes(typeEntry) {
        return typeEntry.field(hasTypesField);
    }
    const onCreate$1 = {
        open: open$2,
        post: post$2
    };
    function open$2(e) {
        e.set("hasTypes", find("Object"));
    }
    function post$2(e) {
        addType(e, "Object");
        addType(e, e.field("Name"));
        return e;
    }
    function create$1(typeName, baseType) {
        if (exists(typeName)) {
            throw messages.existsAlready(typeName);
        }
        return createType(typeName, baseType);
    }
    function createType(typeName, baseType) {
        const typeEntry = library.createEntry("mdbm.Type");
        typeEntry.set("Name", typeName);
        if (baseType === undefined) {
            onCreate$1.open(typeEntry);
        } else {
            typeEntry.set("hasTypes", baseType.field("hasTypes"));
        }
        onCreate$1.post(typeEntry);
        return typeEntry;
    }
    function hasTypesNames(typeName) {
        const hasTypes = find(typeName).field("hasTypes");
        return hasTypes.map(x => x.field("Name"));
    }
    function addEmptyId(entryIds, name) {
        entryIds[name] = null;
        return entryIds;
    }
    function emptyIds(typeName) {
        return hasTypesNames(typeName).reduce(addEmptyId, Object.create(null));
    }
    const type = {
        check: check,
        create: create$1,
        emptyIds: emptyIds,
        isMissing: isMissing$1,
        messages: messages,
        onCreate: onCreate$1
    };
    function typeName(e) {
        return e.field("mdbm.Type");
    }
    const ids = {
        addMissing: addMissing,
        createMissing: createMissing,
        get: get,
        getAll: getAll,
        set: set,
        setAll: setAll,
        setEmpty: setEmpty,
        setSelf: setSelf
    };
    const idsField = "mdbm.Ids";
    function addMissing(e) {
        const entryIds = Object.assign(Object.create(null), type.emptyIds(typeName(e)), getAll(e));
        setAll(e, entryIds);
    }
    function createMissing(e) {
        const entryIds = getAll(e);
        const libNames = Object.keys(entryIds);
        libNames.forEach(addMissingEntry);
        setAll(e, entryIds);
        function addMissingEntry(libraryName) {
            if (entryIds[libraryName] === null) {
                entryIds[libraryName] = library.createEntry(libraryName).id;
            }
        }
    }
    function get(e, libName) {
        return getAll(e)[libName];
    }
    function getAll(e) {
        return common.json.parse(e.field(idsField));
    }
    function set(e, libName, value) {
        const entryIds = getAll(e);
        entryIds[libName] = value;
        setAll(e, entryIds);
    }
    function setAll(e, entryIds) {
        e.set(idsField, common.json.stringify(entryIds));
    }
    function setEmpty(e) {
        const entryIds = type.emptyIds(typeName(e));
        setAll(e, entryIds);
    }
    function setSelf(e) {
        set(e, typeName(e), e.id);
    }
    function displayName(e) {
        const template = type.fromObjectEntry(e).field("DisplayNamePattern");
        const value = template.replace(/\$\{(.*?)\}/g, (ignore, key) => getVal(e, key));
        e.set("DisplayName", value);
        return value;
    }
    function getVal(e, key) {
        return e.field(key);
    }
    const onSave = {
        open: open$1,
        post: post$1
    };
    function open$1(e, activeLibrary) {
        message("nothing");
    }
    function post$1(e) {
        ids.addMissing(e);
        ids.createMissing(e);
        message(displayName(e));
    }
    const onCreate = {
        open: open,
        post: post
    };
    function open(e, activeLibrary) {
        const libraryName = activeLibrary.title;
        if (type.isMissing(libraryName)) {
            activeLibrary.show();
            throw type.messages.isMissing(libraryName);
        }
        e.set("mdbm.Type", libraryName);
        ids.setEmpty(e);
    }
    function post(e) {
        ids.setSelf(e);
        onSave.post(e);
    }
    function create(libraryName) {
        const object = library.createEntry(libraryName);
        onCreate.open(object, library.get(libraryName));
        onCreate.post(object);
        object.show();
    }
    const object = {
        create: create,
        displayName: displayName,
        onCreate: onCreate
    };
    exports.library = library;
    exports.object = object;
    exports.type = type;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
