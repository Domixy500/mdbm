/*jslint*/
/*global*/

function mdbmCommon() {
    function errorIfUndefined(msg, variables) {
        if (variables.some(isUndefined)) {
            throw new Error(msg);
        }
    }
    
    function isUndefined(variable) {
        return variable === undefined
    }
    
    function jsonParse(str) {
        return JSON.parse(
            replaceAll(
                str,
                "'",
                "\""
            )
        );
    }
    
    function jsonStringify(obj) {
        return replaceAll(
            JSON.stringify(
                obj,
                null,
                2
            ),
            "\"",
            "'"
        );
    }
    
    function replaceAll(str, searchValue, replaceValue) {
        return str.replace(
            new RegExp(searchValue, "g"),
            replaceValue
        );
    }
    
    return {
        "errorIfUndefined": errorIfUndefined,
        "isUndefined": isUndefined,
        "json": {
            "parse": jsonParse,
            "stringify": jsonStringify
        }
    };
}

function mdbmObject(e) {
    const common = mdbmCommon();
    
    function data(key, value) {
        const paras = [key, value];
        if(paras.some(common.isUndefined)) {
            return common.json.parse(
                e.field("mdbmData")
            );
        } else {
            const mdbmData = data();
            mdbmData[key] = value;
            e.set(
                "mdbmData",
                common.json.stringify(
                    mdbmData
                )
            );
            return mdbmData;
        }
    }
    
    function entryIds() {
        const stored = data().entryIds;
        const ids = (
            stored === undefined
            ? entryIdsNew()
            : JSON.parse(stored)
        );
        log(common.json.stringify(
            data()
        ));
        data("entryIds", ids);
        log(common.json.stringify(
            data()
        ));
        return ids;
    }
    
    function entryIdsNew() {
        const ids = R.fromPairs(
            libraries().map((x) => [x, null])
        );
        return ids;
    }
    
    function eventCreateBefore() {
        return entryIds();
    }

    function eventCreateInit(currentLibrary) {
        common.errorIfUndefined(
            "eventCreateInit: currentLibrary is not defined",
            [currentLibrary]
        );
        e.set(
            "mdbmCurrentLibrary",
            currentLibrary
        );
    }
    
    function libraries() {
        return data().libraries;
    }
    
    
    return {
        "event": {
            "create": {
                "before": eventCreateBefore,
                "init": eventCreateInit
            }
        },
        "id": "id"
    };
}

function mdbm() {
    return {
        "object": mdbmObject
    };
};