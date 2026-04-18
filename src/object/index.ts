//import * as create from "./create";
function defaultIds(e: Entry): StringDict {
    const ids: StringDict = {};
    const typeName = mdbmField(e, "Type");
    ids[typeName] = e.id;
    return ids;
}

function ids(e: Entry): StringDict {
    const data = mdbmField(e, "Ids");
    return (
        data === ""
        ? defaultIds(e)
        : JSON.parse(data));
}

function mdbmField(e: Entry, fieldName:string) {
    return e.field("mdbm." + fieldName);
}

function typeName(e: Entry) {
    const data = mdbmField(e, "Type");
    if (data === "") {
        throw `No Type defined for ${e.id}!`;
    }
    
    return data;
}

export default Object.freeze({
    ids,
    typeName
});
