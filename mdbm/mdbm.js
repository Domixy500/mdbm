/*jslint*/
/*global*/

function mdbmCommon() {
    return {};
}

function mdbmObject(e) {
    const common = mdbmCommon();
}

function mdbm() {
    return {
        "common": mdbmCommon,
        "object": mdbmObject
    };
}