/*jslint beta*/
/*global
    R
*/

"use strict";

const mdbmHelper = (function () {
    function initObject(e, libraryName) {
        mdbmDataInit(e);
    }

    function mdbmDataInit(e) {
        setData(e, "mdbmData", [{}]);
    }

    function setData(e, field, value) {
        e.set(field, value);
        return e;
    }

    return Object.freeze(R.map(R.curry, {
        "initObject": initObject
    }));
}());

function _mdbmObject(e) {
    const {
        initObject
    } = mdbmHelper();

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