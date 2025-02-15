/*jslint beta*/
/*global
    R
*/

"use strict";

const _mdbmField = (function () {
    const fromName = R.curry(field);
    const fromNames = R.curry(fields);

    function field(fieldName, e) {
        return function (newValue) {
            return (
                newValue === undefined
                ? e.field(fieldName)
                : e.set(fieldName, newValue)
            );
        };
    }

    function fields(fieldNames, e) {
        const entryField = fromName(e);
        const fieldNameObject = R.zipObj(fieldNames, fieldNames);

        return R.map(entryField, fieldNameObject);
    }

    return {
        "fromName": fromName,
        "fromNames": fromNames
    };
}());

const _mdbmObject = (function () {
    const fields = _mdbmField.fromNames(["mdbmCurrentLibrary"]);
    const mdbmCurrentLibrary = _mdbmField.fromName("mdbmCurrentLibrary");
    // const fields = R.map(_mdbmField.fromName, {
    //     id: null
    // });

    function fromEntry(e) {
        log(mdbmCurrentLibrary(e)());
        log(fields(e).mdbmCurrentLibrary());
        return 1;
    }

    return {
        "fromEntry": fromEntry
    };
}());

function mdbm() {
    return {
        "object": _mdbmObject.fromEntry
    };
}