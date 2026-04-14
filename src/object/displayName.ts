import { findKeyByValue } from "../common";

function displayName(entry: Entry): string {
    const typeName = findKeyByValue(en) 
    const
    return pattern.replace(/\$\{([^}]+)\}/g, (_, fieldName) => {
        const value = entry.field(fieldName);
        return value != null ? String(value) : "";
    });
}

export {
    displayName
};
