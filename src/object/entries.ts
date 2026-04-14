import { getEntry } from "../mementoDatabase";

function entries(activeEntry: Entry): Entry[] {
    const ids:StringDict = JSON.parse(activeEntry.field("mdbm.Ids"));
    return Object.entries(ids).map(
        ([libraryName, id]) => getEntry(libraryName, id)
    );
}
    
export {
    entries
};
