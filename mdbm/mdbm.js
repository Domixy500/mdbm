/*jslint*/
/*global
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

    // function replaceAll(str, searchValue, replaceValue) {
    //     return str.replace(
    //         new RegExp(searchValue, "g"),
    //         replaceValue
    //     );
    // }

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

function mdbmObject(e) {
    const common = mdbmCommon();

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
        const stored = data().entryIds;
        log(stored)
        log(typeof stored)
        const ids = (
            stored === undefined
            ? entryIdsNew()
            : common.json.parse(stored)
        );
        data(
            "entryIds",
            common.json.stringify(ids)
        );
        return ids;
    }

    function entryIdsNew() {
        const ids = R.fromPairs(
            libraries().map((x) => [x, null])
        );
        return ids;
    }

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