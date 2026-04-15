import {stringDictFromKeys} from "../common";

function displayName(typeName: string): string {
    return field(typeName, "DisplayName");
}

function emptyIds(typeName: string): StringDict {
    const keys = typeNames(typeName);
    return stringDictFromKeys(keys);
}

function field(typeName: string, fieldName: string) {
    return typeEntry(typeName).field(fieldName);
}

function typeEntry(typeName: string) {
    const library = libByName("ObjectType");
    return library.findByKey(typeName);
}

function typeNames(typeName: string) {
    return types(typeName).map(
        (x: Entry) => x.name
    );
}

function types(typeName: string) {
    return typeEntry(typeName).field("Types");
}

export default Object.freeze({
    emptyIds,
    displayName
});
