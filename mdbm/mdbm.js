/*jslint*/
/*global*/

function mdbmCommon() {
    return {};
}

function mdbmObject(e) {
    function data() {
        return e.field("mdbmData")[0];
    }
    
    function id() {
        return data().id;
    }
    
    return {
        "id": id
    };
}

const mdbm = {
    "common": mdbmCommon(),
    "object": mdbmObject
};