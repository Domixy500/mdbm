/*jslint beta*/
/*global
    entry
    masterEntry
    masterField
    masterLib
*/

const onLink = {
    post
};

function classOf(object) {
    return Object.prototype.toString.call(object).slice(8, -1);
}

function hasLinkedEntries([ignore, field]) {
    if (isList(field)) {
        if (field.length > 0) {
            return isEntry(field[0]);
        }
    }
    return false;
}

function isClass(object, className) {
    return classOf(object) === className;
}

function isEntry(object) {
    return isClass(object, "Entry");
}

function isList(object) {
    return isClass(object, "ScriptableList");
}



function linkData() {
    const data = {
        linked: {
            entry: entry()
        },
        master: {
            entry: masterEntry(),
            field: masterField(),
            library: masterLib()
        }
    };
    data.master.fieldName = masterFieldName(data);
    return data;
}

function masterFieldName(data) {
    const fieldNames = data.master.library.fields();
    const fields = fieldNames.map(
        (x) => [x, data.master.entry.field(x)]
    ).filter(hasLinkedEntries);
}

function post() {
    const data = linkData();
}

export {
    onLink
};
