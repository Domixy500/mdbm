import {stringDictFromKeys} from "../common";

function displayName(typeName: string): string {
    return typeEntry(typeName).field("DisplayName");
}

function typeEntry(typeName: string) {
    const library = libByName("ObjectType");
    return library.findByKey(typeName);
}

function types(typeName: string) {
    return typeEntry(typeName).field("Types");
}

function emptyIds(typeName: string): StringDict {
    const keys = typeNames(typeName);
    return stringDictFromKeys(keys);
}

function typeNames(typeName: string) {
    return types(typeName).map(
        (x: Entry) => x.name
    );
}

export default Object.freeze({
    displayName,
    emptyIds
});
