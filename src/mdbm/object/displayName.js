function patternFromObject(e) {
    return e.field("DisplayNamePattern") || patternFromPrototype(
            e.field("Prototype")[0]
    );
}


function patternFromPrototype(e) {
    return e.field("DisplayNamePattern") || patternFromPrototype(
            e.field("basedOn")[0]
    );
}

function displayName(e) {
    const pattern = patternFromObject(e);
    const properties = e.linksFrom("Property", "Object");
    
    function replacer(_, fieldName) {
        const property = properties.filter(
            (x) => x.field("Label") === fieldName
        )[0];
        return (
            property
            ? property.field("Value")
            : ""
        );
    }

    return pattern.replace(
        /\$\{([^}]+)\}/g,
        replacer
    );
}

export {
    displayName
};
