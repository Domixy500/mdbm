/*jslint beta*/
/*global
    R
*/

"use strict";

const _mdbmData = (function () {

    function entryIds(e) {
        const data = mdbmData(e);

        return function(newValue) {
            return (
                newValue === undefined
                ? data().entryIds
                : data({"entryIds": newValue})
            );
        };
    }

    function fromEntry(e) {


        return Object.freeze({
            "entryIds": entryIds(e)
        });
    }

    function mdbmData(e) {
        return _mdbmField.fromName("mdbmData", e);
    }

    return Object.freeze({
        "fromEntry": fromEntry
    });
}());


const _mdbmField = (function () {
    const field = R.curry(function (e, fieldName) {
        return function (newValue) {
            return (
                newValue === undefined
                ? e.field(fieldName)
                : e.set(fieldName, newValue)
            );
        };
    });

    const fields = R.curry(function (e, fieldNames) {
        const entryField = field(e);
        const entryFields = R.map(entryField, fieldNames);

        return R.zipObj(fieldNames, entryFields);
    });

    return Object.freeze({
        "fromName": R.flip(field),
        "fromNames": R.flip(fields)
    });
}());

const _mdbmObject = (function () {
    const fields = _mdbmField.fromNames([
        "mdbmCurrentLibrary",
        "mdbmData"
    ]);

    // const initObject = R.curry(function (e, libraryName) {
    //     mdbmDataInit(e);
    //     setData(
    //         e,
    //         "mdbmCurrentLibrary",
    //         libraryName
    //     );
    //     return e;
    // });



    function fromEntry(e) {
        const {
            mdbmCurrentLibrary,
            mdbmData
        } = fields(e);

        return Object.freeze({
            "mdbmCurrentLibrary": mdbmCurrentLibrary,
            "mdbmData": mdbmData
        });
    }

    function init(e) {

        return function (libraryName) {

        };
    }

    function mdbmData(e) {
        return function (newValue) {
            return (
                newValue === undefined
                ? fields(e).mdbmData()[0]
                : e.set("mdbmData", newValue)
            );
        };
    }

    return Object.freeze({
        "fromEntry": fromEntry
    });
}());

function mdbm() {
    return Object.freeze({
        "object": _mdbmObject.fromEntry
    });
}