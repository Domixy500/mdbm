/*jslint beta*/
/*global
    R
*/

"use strict";

function _common() {
    const json = {
        "parse": (string) => JSON.parse(string),
        "stringify": (object) => JSON.stringify(object, null, 2)
    };

    return Object.freeze({
        "json": json
    });
}

function _mdbmData() {
    // const getActions = {
    //     "entryIds": _common().json.parse
    // };
    // const setActions = {
    //     "entryIds": _common().json.stringify
    // };

    function fromEntry(e) {

        return Object.freeze({
            "type": type(e)
        });
    }

    function getData(e, key) {
        return _mdbmField(e, "mdbmField")()[0][key];
    }

    function setData(e, key, newValue) {
        const data = _mdbmField(e, "mdbmField")()[0];
        data[key] = newValue
        _mdbmField(e, "mdbmField")()
    }

    function type(e) {
        return function(newValue) {
            return (
                newValue === undefined
                ? getData(e, "type")
                : setData(e, "type", newValue)
            );
        };
    }

    return Object.freeze({
        "fromEntry": fromEntry
    });
}


function _mdbmField() {
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
        "fromName": field,
        "fromNames": fields
    });
}

function _mdbmObject() {

    function fromEntry(e) {

        return Object.freeze({
            "a": "a"
        });
    }

    return Object.freeze({
        "fromEntry": fromEntry
    });
}

function mdbm() {
    return Object.freeze({
        "object": _mdbmObject().fromEntry
    });
}