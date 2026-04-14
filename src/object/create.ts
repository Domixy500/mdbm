import objectType from "../objectType";

function fromEntry(baseEntry: Entry, typeName: string): void {
    const ids = objectType.emptyIds(typeName);
    ids[typeName] = baseEntry.id;
}
    
export {
    fromEntry
};
