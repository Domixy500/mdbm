/*jslint*/
/*global*/

function mdbmCommon() {
    function errorIfUndefined(msg, variables) {
        if (variables.some(isUndefined)) {
            throw new Error(msg);
        }
    }
    
    function isUndefined(variable) {
        return variable === undefined
    }
    
    return {
        "errorIfUndefined": errorIfUndefined
    };
}

function mdbmObject(e) {
    const common = mdbmCommon();
    function data() {
        return e.field("mdbmData")[0];
    }
    
    function entries() {
        
    }
    
    function entryIds() {
        const stored = data().entryIds;
        log(stored)
        const ids = (
            stored === ""
            ? entryIdsNew()
            : JSON.parse(stored)
        );
        setData(
            "entryIds",
            JSON.stringify(ids)
        );
        log(ids)
        return ids;
    }
    
    function entryIdsNew() {
        const ids = R.fromPairs(
            libraries().map((x) => [x, null])
        );
        return ids;
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

    function eventCreateBefore() {
        entryIds();
    }

    function id() {
        return data().id;
    }
    
    function libraries() {
        return data().libraries.split(",");
    }
    
    function setData(key, value) {
        const mdbmData = e.field("mdbmData");
        log(Array.isArray(mdbmData))
        mdbmData[0][key] = value;
        log(JSON.stringify(mdbmData, null, 2))
        e.set(
            "mdbmData",
            Array.from(mdbmData)
        );
    }
    
    return {
        "event": {
            "create": {
                "before": eventCreateBefore,
                "init": eventCreateInit
            }
        },
        "id": id
    };
}

function mdbm() {
    return {
        "object": mdbmObject
    };
};