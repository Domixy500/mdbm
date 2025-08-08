function displayName(e) {
    const pattern = e.field("DisplayNamePattern");
    const properties = e.linkedFrom("Property", "Object");
    
    function replacer(_, fieldName) {
        const property = properties.filter(
            (x) => x.field("Label") === fieldName
        )[0];
        return property.field("Value");
    }

    return pattern.replace(
        /\$\{([^}]+)\}/g,
        replacer
    );
}

export {
    displayName
};
