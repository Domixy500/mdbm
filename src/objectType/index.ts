function typeEntry(typeName: string) {
    const library = libByName("ObjectType");
    return library.findByKey(typeName);
}

function types(typeName: string) {
    return typeEntry(typeName).field("Types");
}

function emptyIds(typename: string): Record<string, string> {
    const keys = typeNames(typeName);
    const entries = keys.map(
        (x) => [x, null]
    );
    return Object.fromEntries(entries);
}

function typeNames(typeName: string) {
    return types(typename).map(
        (x: Entry) => x.name
    );
}

export default Object.freeze({
    emptyIds
});
