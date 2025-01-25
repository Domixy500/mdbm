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
        return ids;
    }
    
    function entryIdsNew() {
        const ids = R.fromPairs(
            libraries().map((x) => [x, null])
        );
        e.set()
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
        
    }

    function id() {
        return data().id;
    }
    
    function libraries() {
        return data().libraries.split(",");
    }
    
    return {
        "event": {
            "create": {
                "init": eventCreateInit
            }
        },
        "id": id
    };
}

const mdbm = {
    "common": mdbmCommon(),
    "object": mdbmObject
};