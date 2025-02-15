/*jslint beta*/
/*global
    R
*/

"use strict";

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

    function fromEntry(e) {
        return Object.freeze({
            mdbmCurrentLibrary: fields(e).mdbmCurrentLibrary,
            mdbmData: fields(e).mdbmData
        });
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