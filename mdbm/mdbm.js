/*jslint*/
/*global*/

function mdbmCommon() {
    return {};
}

function mdbmObject(e) {
    const common = mdbmCommon();

    function eventCreateBefore() {

    }

    function eventCreateInit(currentLibrary) {
        common.errorIfUndefined(
            "eventCreateInit: currentLibrary is not defined",
            [currentLibrary]
        );
        e.set(
            "mdbmCurrentLibrary",
            currentLibrary
        );
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