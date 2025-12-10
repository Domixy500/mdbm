import {find} from "./find";

export function exists(name: string): boolean {
    return find(name) !== undefined;;
}
