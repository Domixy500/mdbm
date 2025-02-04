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

    function eventCreateInit(currentLibrary) {
        common.errorIfUndefined(
            "eventCreateInit: currentLibrary is not defined",
            [currentLibrary]
        );
        //e.set("mdbmData", [{}]);
        //e.set(
        //    "mdbmCurrentLibrary",
        //    currentLibrary
        //);
    }
    
    return {
        "event": {
            "create": {
                "before": "eventCreateBefore",
                "init": eventCreateInit
            }
        },
        "id": "id"
    };
}

function mdbm() {
    return {
        "object": mdbmObject
    };
};