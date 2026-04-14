import {createEntry} from "../mementoDatabase";
import objectType from "../objectType";

function fromEntry(baseEntry: Entry, typeName: string): void {
    const ids = objectType.emptyIds(typeName);
    ids[typeName] = baseEntry.id;
    Object.keys(ids).forEach(
        function (key: string) {
            if(ids[key] !== "") {
                ids[key] = createEntry(key).id;
            }
        }
    );
}
    
export {
    fromEntry
};
