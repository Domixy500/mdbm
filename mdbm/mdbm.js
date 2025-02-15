/*jslint beta*/
/*global
    R
*/

"use strict";

const _mdbmField = (function () {
    function fromName(fieldName, e) {
        return function (newValue) {
            return (
                newValue === undefined
                ? e.field(fieldName)
                : e.sete(fieldName, newValue)
            );
        };
    }

    return {
        "fromName": R.curry(fromName)
    };
}());

const _mdbmObject = (function () {
    const id = _mdbmField.fromName("id");
    // const fields = R.map(_mdbmField.fromName, {
    //     id: null
    // });

    function fromEntry(e) {
        log(id);
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