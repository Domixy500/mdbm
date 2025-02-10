/*jslint*/
/*global
    libByName
    log
    R
*/

function mdbmCommon() {
    function commonLog(obj) {
        log(jsonStringify(obj));
    }

    function errorIfUndefined(msg, variables) {
        if (variables.some(isUndefined)) {
            throw new Error(msg);
        }
    }

    function excludeFrom(target, toExclude) {
        return target.filter((item) => !toExclude.includes(item));
    }

    function isUndefined(variable) {
        return variable === undefined;
    }

    function jsonParse(str) {
        return JSON.parse(str);
    }

    function jsonStringify(obj) {
        return JSON.stringify(
            obj,
            null,
            2
        );
    }

    return {
        "errorIfUndefined": errorIfUndefined,
        "excludeFrom": excludeFrom,
        "isUndefined": isUndefined,
        "json": {
            "parse": jsonParse,
            "stringify": jsonStringify
        },
        "log": commonLog
    };
}

function mdbmHelper() {
    function createEntry(libraryName, data) {
        const library = libByName(libraryName);
        data = data || {};
        const newEntry = library.create(data);
        newEntry.set("mdbmCurrentLibrary", libraryName);
        return newEntry;
    }

    function getEntry(libraryName, id) {
        const library = libByName(libraryName);
        return library.findById(id);
    }

    return {
        "create": {
            "entry": createEntry
        },
        "getEntry": getEntry
    };
}

function mdbmObject(e) {
    const helper = mdbmHelper();
    const common = mdbmCommon();

    function currentLibrary() {
        return e.field("mdbmCurrentLibrary");
    }

    function data(key, value) {
        const paras = [key, value];
        if (paras.some(common.isUndefined)) {
            return e.field("mdbmData")[0];
        } else {
            const mdbmData = data();
            mdbmData[key] = value;
            e.set(
                "mdbmData",
                JSON.stringify([mdbmData])
            );
            return mdbmData;
        }
    }

    function entryIds() {
        const updatedEntryIds = R.pipe(
            readEntryIds,
            addMissingLibraries,
            setCurrentLibraryId,
            createMissingEntries
        )(data().entryIds);
        data(
            "entryIds",
            common.json.stringify(updatedEntryIds)
        );

        function createMissingEntries(input) {
            return R.mapObjIndexed(createMissingEntry, input);
        }

        function createMissingEntry(value, key) {
            return (
                value === null
                ? helper.create.entry(key).id
                : value
            );
        }

        function addMissingLibraries(input) {
            return Object.assign(
                {},
                input,
                newEntryIds(libraries())
            );
        }

        function newEntryIds(newLibraries) {
            return R.fromPairs(
                newLibraries.map((x) => [x, null])
            );
        }

        function readEntryIds(input) {
            return (
                input === ""
                ? {}
                : common.json.parse(input)
            );
        }

        function setCurrentLibraryId(ids) {
            if (ids[currentLibrary()] === null) {
                ids[currentLibrary()] = e.id;
            }
            return ids;
        }

        return updatedEntryIds;
    }

    function eventCreateBefore() {
        entryIds();
        sync();
    }

    function eventCreateInit(currentLibrary) {
        common.errorIfUndefined(
            "eventCreateInit: currentLibrary is not defined",
            [currentLibrary]
        );
        e.set("mdbmData", [{}]);
        e.set(
            "mdbmCurrentLibrary",
            currentLibrary
        );
    }

    function getEntries() {
        return R.map(
            helper.getEntry,
            entryIds()
        );
    }

    function getFields() {
        return libByName(
            currentLibrary()
        ).fields();
    }

    function libraries() {
        return data().libraries.split(",");
    }

    function sync() {
        const fields = common.excludeFrom(
            getFields(),
            ["mdbmCurrentLibrary"]
        );
        log(fields);
        common.log(fields);
        const otherEntries = getEntries();
        common.log(otherEntries);
    }

    return {
        "event": {
            "create": {
                "before": eventCreateBefore,
                "init": eventCreateInit
            }
        },
        "id": "id",
        "sync": sync
    };
}

function mdbm() {
    return {
        "common": mdbmCommon,
        "object": mdbmObject
    };
}