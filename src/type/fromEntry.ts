import {name} from "./name";

export function fromEntry(typeEntry: Entry): Type {
    return Object.freeze({
        name: () => name(typeEntry),
        id: 5
    });
}
