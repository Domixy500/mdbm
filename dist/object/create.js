import { toJson } from "../common";
import { createEntry } from "../mementoDatabase";
import objectType from "../objectType";
import { displayName } from "./displayName";
import { syncProperty } from "./syncProperty";
function fromEntry(baseEntry, typeName) {
    const ids = objectType.emptyIds(typeName);
    ids[typeName] = baseEntry.id;
    Object.keys(ids).forEach(function (key) {
        if (ids[key] === "") {
            ids[key] = createEntry(key).id;
        }
    });
    baseEntry.set("mdbm.Ids", toJson(ids));
    displayName(baseEntry);
    syncProperty(baseEntry, "mdbm.Ids");
}
export { fromEntry };
