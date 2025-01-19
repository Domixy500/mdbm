/*jslint*/
/*global*/

function mdbmCommon() {
    return {};
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
        return R.fromPairs(
            libraries().map((x) => [x, null])
        );
    }
    
    function eventCreateInit() {
        e.set("mdbmData", {});
        e.set(
            "mdbmCurrenLibrary",
            lib().title
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