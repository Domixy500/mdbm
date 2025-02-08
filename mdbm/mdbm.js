/*jslint*/
/*global
    R
*/

function mdbmCommon() {
    function errorIfUndefined(msg, variables) {
        if (variables.some(isUndefined)) {
            throw new Error(msg);
        }
    }

    function isUndefined(variable) {
        return variable === undefined;
    }

    return {
        "errorIfUndefined": errorIfUndefined,
        "isUndefined": isUndefined
    };
}

function mdbmObject(e) {
    const common = mdbmCommon();

    function data(key, value) {
        const paras = [key, value];
        if (paras.some(common.isUndefined)) {
            return common.json.parse(
                e.field("mdbmData")
            );
        } else {
            const mdbmData = data();
            mdbmData[key] = value;
            e.set(
                "mdbmData",
                common.json.stringify(
                    mdbmData
                )
            );
            return mdbmData;
        }
    }

    function entryIds() {
        const stored = data().entryIds;
        const ids = (
            stored === undefined
            ? entryIdsNew()
            : JSON.parse(stored)
        );
        data(
            "entryIds",
            JSON.stringify(ids)
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