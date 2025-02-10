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
        return entry;
    }

    return {
        "create": {
            "entry": createEntry
        }
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

        function createMissingEntries(input) {
            return R.mapObjIndexed(createMissingEntry, input);
        }

        function createMissingEntry(value, key) {
            return (
                value === null
                ? helper.createEntry(key).id
                : value
            );
        }

        function addMissingLibraries(input) {
            common.log(input);
            common.log(newEntryIds(libraries()));
            // return R.merge(
            //     newEntryIds(libraries()),
            //     input
            // );
            return Object.assign({}, input, newEntryIds(libraries()));
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

        return R.pipe(
            readEntryIds,
            addMissingLibraries,
            setCurrentLibraryId,
            createMissingEntries
        )(data().entryIds);
        // const stored = data().entryIds;
        // const ids = (
        //     stored === ""
        //     ? entryIdsNew()
        //     : common.json.parse(stored)
        // );
        // data(
        //     "entryIds",
        //     common.json.stringify(ids)
        // );
        // return ids;
    }

    // function entryIdsNew() {
    //     const ids = R.fromPairs(
    //         libraries().map((x) => [x, null])
    //     );
    //     return ids;
    // }

    function eventCreateBefore() {
        entryIds();
        // data("entryIds", "A");
        // common.log(data());
        // log(result);
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

    function libraries() {
        return data().libraries.split(",");
    }

    return {
        "event": {
            "create": {
                "before": eventCreateBefore,
                "init": eventCreateInit
            }
        },
        "id": "id"
    };
}

function mdbm() {
    return {
        "common": mdbmCommon,
        "object": mdbmObject
    };
}