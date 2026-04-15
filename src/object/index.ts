//import * as create from "./create";
function defaultIds(e: Entry) {
    const typeName = mdbmField(e, "Type");
}

function typeName(e: Entry) {
    const data = mdbmField("Type");
    if (data === "") {
        throw `No Type defined for ${e.id}!`;
    }
    
    return data;
}

function mdbmField(e: Entry, fieldName:string) {
    return e.field("mdbm." + fieldName);
}

function ids(e: Entry): stringDict {
    const data = mdbmField("Ids");
    return (
        data === ""
        ? defaultIds(e)
        : JSON.parse(data)
    );
}

export default Object.freeze({
    ids: getIds
});
