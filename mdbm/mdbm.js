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
    function data() {
        return e.field("mdbmData")[0];
    }
    
    function entries() {
        
    }
    
    function entryIds() {
        const stored = data().entryIds;
        const ids = (
            stored === ""
            ? entryIdsNew()
            : JSON.parse(stored)
        );
        setData("entryIds", ids);
        return ids;
    }
    
    function entryIdsNew() {
        const ids = R.fromPairs(
            libraries().map((x) => [x, null])
        );
        return ids;
    }
    
    function eventCreateInit(currentLibrary) {
        mdbm.common.errorIfUndefined(
            "eventCreateInit: currentLibrary is not defined",
            [currentLibrary]
        );
        e.set("mdbmData", {});
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
        const mdbmData = data();
        mdbmData[key] = value;
        e.set("mdbmData", mdbmData);
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
        "common": mdbmCommon(),
        "object": mdbmObject
    };
};