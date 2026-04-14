import {createEntry} from "../mementoDatabase";
import objectType from "../objectType";

function fromEntry(baseEntry: Entry, typeName: string): void {
    const ids = objectType.emptyIds(typeName);
    log(ids.toString());
    ids[typeName] = baseEntry.id;
    log(JSON.stringify(ids, null, 2));
    Object.keys(ids).forEach(
        function (key: string) {
            if(ids[key] !== "") {
                ids[key] = createEntry(key).id;
            }
        }
    );
    log(JSON.stringify(ids, null, 2));
}
    
export {
    fromEntry
};
