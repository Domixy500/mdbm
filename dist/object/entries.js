import { getEntry } from "../mementoDatabase";
function entries(activeEntry) {
    const ids = JSON.parse(activeEntry.field("mdbm.Ids"));
    return Object.entries(ids).map(([libraryName, id]) => getEntry(libraryName, id));
}
export { entries };
