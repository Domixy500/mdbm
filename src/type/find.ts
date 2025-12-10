import {entries} from "./entries";

export function find(name: string): Entry | undefined {
    return entries().find(
        (e) => e.field("Name") === name
    );
}
