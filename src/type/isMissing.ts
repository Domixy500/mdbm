import {exists} from "./exists";

export function isMissing(name: string): boolean {
    return !exists(name);
}
