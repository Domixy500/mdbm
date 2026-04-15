//import * as create from "./create";
function defaultIds(e) {
    const ids = {};
    const typeName = mdbmField(e, "Type");
    ids[typeName] = e.id;
    return ids;
}
function ids(e) {
    const data = mdbmField(e, "Ids");
    return (
        data === ""
            ? defaultIds(e)
            : JSON.parse(data)
    );
}
function mdbmField(e, fieldName) {
    return e.field("mdbm." + fieldName);
}
function typeName(e) {
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
