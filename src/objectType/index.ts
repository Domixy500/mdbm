function typeEntry(typeName) {
    const library = libByName("ObjectType");
    return library.findByKey(typeName);
}

function hasTypes(typeName) {
    return typeEntry(typeName).field("hasTypes");
}

function typeNames(typeName) {
    const types = hasTypes(typeName);
    return types.map(
        (x) => x.name
    );
}

export default Object.freeze({
    hasTypes,
    typeNames
});
