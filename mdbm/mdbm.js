/*jslint beta*/
/*global
    R
*/

"use strict";

const curryFreeze = function(obj) {
    return Object.freeze(
        R.map(R.curry, obj)
    );
} 

function _mdbmCommon() {
    
}

function _mdbmFunctions() {
    function initObject(e, libraryName) {
        mdbmDataInit(e);
        setData(e,
            "mdbmCurrentLibrary",
            libraryName
        );
        return e;
    }

    function mdbmDataInit(e) {
        setData(e, "mdbmData", [{}]);
    }

    function setData(e, field, value) {
        e.set(field, value);
        return e;
    }

    return curryFreeze({
        "initObject": initObject
    });
}

function _mdbmObject(e) {
    const {
        initObject
    } = _mdbmFunctions();

    return {
        "event": {
            "create": {
                "init": initObject(e)
            }
        }
    };
}

function mdbm() {
    return {
        "object": _mdbmObject
    };
}