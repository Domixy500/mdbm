/*jslint*/
/*global*/

function mdbmCommon() {
    return {};
}

function mdbmObject(e) {
    function data() {
        return e.field("mdbmData")[0];
    }
    
    function eventCreateInit() {
        e.set("mdbmData", {});
    }
    
    function id() {
        return data().id;
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