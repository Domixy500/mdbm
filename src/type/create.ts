import {exists} from "./exists";
//import {library} from "@library";
//import {onCreate} from "./onCreate";

function create(name: string, baseType: Type): Type {
    if (exists(name)) {
        throw messages.existsAlready(typeName);
    }
    return createType(typeName, baseType);
}

function createType(typeName, baseType) {
    const typeEntry = library.createEntry("mdbm.Type");
    typeEntry.set("Name", typeName);
    if (baseType === undefined) {
        onCreate.open(typeEntry);
    } else {
        typeEntry.set(
            "hasTypes",
            baseType.field("hasTypes")
        );
        typeEntry.set(
            "DisplayName",
            baseType.field("DisplayName")
        );
    }
    onCreate.post(typeEntry);
    return typeEntry;
}

export {
    create
};