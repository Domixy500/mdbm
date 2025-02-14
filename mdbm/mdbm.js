/*jslint beta*/
/*global
    R
*/

"use strict";

// function curryFreeze(obj) {
//     return Object.freeze(
//         R.map(R.curry, obj)
//     );
// }

// function _mdbmCommon() {

// }

function _mdbmFunctions() {
    // const entryIds = function
    const initObject = R.curry(function (e, libraryName) {
        mdbmDataInit(e);
        setData(
            e,
            "mdbmCurrentLibrary",
            libraryName
        );
        return e;
    });

    const mdbmData = function (e) {
        log(JSON.stringify(prop(e, "mdbmData")));
        return prop(e, "mdbmData");
    };

    const mdbmDataInit = (e) => setData(e, "mdbmData", [{}]);

    const prop = R.curry(function (e, fieldName) {
        return e.field(fieldName);
    });

    // function (e) {
    //     setData(e, "mdbmData", [{}]);
    // };
    const setData = R.curry(function (e, fieldName, value) {
        e.set(fieldName, value);
        return e;
    });

    const updateObjectStructure = function (e) {
        // return setData(e, "mdbmData", [{}]);
        return R.pipe(
            mdbmData,
            setData(e, "mdbmData", [{}])
        )(e);
    };


    // function entryIds(e) {
    //     return R.pipe(
    //         // readEntryIds,
    //         // addMissingLibraries,
    //         // setCurrentLibraryId,
    //         // createMissingEntries
    //     )(data().entryIds);
    // }

    // function field(e, fieldName) {
    //     return e.field(fieldName);
    // }

    // function mdbmData(e) {
    //     return field(e, "mdbmData")[0];
    // }

    // function mdbmDataField(e, fieldName) {
    //     return mdbmData(e)[fieldName];
    // }






    return Object.freeze({
        "initObject": initObject,
        "updateObjectStructure": updateObjectStructure
    });
}

function _mdbmObject(e) {
    const {
        initObject,
        updateObjectStructure
    } = _mdbmFunctions();

    const onCreate = {
        "before": () => updateObjectStructure(e),
        "init": initObject(e)
    };

    return {
        "event": {
            "create": {
                "before": onCreate.before,
                "init": onCreate.init
            }
        },
        "onCreate": onCreate
    };
}

function mdbm() {
    return {
        "object": _mdbmObject
    };
}