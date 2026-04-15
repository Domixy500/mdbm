import { stringDictFromKeys } from "../common";
function displayName(typeName) {
    return field(typeName, "DisplayName");
}
function emptyIds(typeName) {
    const keys = typeNames(typeName);
    return stringDictFromKeys(keys);
}
function field(typeName, fieldName) {
    return typeEntry(typeName).field(fieldName);
}
function typeEntry(typeName) {
    const library = libByName("ObjectType");
    return library.findByKey(typeName);
}
function typeNames(typeName) {
    return types(typeName).map((x) => x.name);
}
function types(typeName) {
    return typeEntry(typeName).field("Types");
}
export default Object.freeze({
    emptyIds,
    displayName
});
