function typeEntry(typeName: string) {
    const library = libByName("ObjectType");
    return library.findByKey(typeName);
}

function hasTypes(typeName: string) {
    return typeEntry(typeName).field("hasTypes");
}

function typeNames(typeName: string) {
    const types = hasTypes(typeName);
    return types.map(
        (x: Entry) => x.name
    );
}

export default Object.freeze({
    hasTypes,
    typeNames
});
