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
    // const entryIds = R.curry(function (e, data) {
    //     return (
    //          === ""
    //         ? {}
    //         : common.json.parse(input)
    //     );
    // }

    const field = R.curry(function (e, fieldName) {
        return e.field(fieldName);
    });

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
        return field(e, "mdbmData")[0];
    };

    const mdbmDataInit = (e) => setData(e, "mdbmData", [{}]);

    const mdbmDataSet = R.curry(function (e, data) {
        setData(e, "mdbmData", JSON.stringify([data]));
        return e;
    });


    // function (e) {
    //     setData(e, "mdbmData", [{}]);
    // };
    const setData = R.curry(function (e, fieldName, value) {
        e.set(fieldName, value);
        return e;
    });

    const updateEntryIds = R.curry(function (e, data) {

        return data;
    });

    const updateObjectStructure = function (e) {
        return R.pipe(
            mdbmData,
            updateEntryIds(e),
            mdbmDataSet(e)
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
        "onCreate": onCreate
    };
}

function mdbm() {
    return {
        "object": _mdbmObject
    };
}