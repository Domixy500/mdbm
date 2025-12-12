import {id} from "./id";
import {name} from "./name";

export function fromEntry(typeEntry: Entry): Type {
    return Object.freeze({
        id: () => id(typeEntry),
        name: () => name(typeEntry)
    });
}
