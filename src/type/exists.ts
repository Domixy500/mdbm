import {find} from "./find";

function exists(name: string): boolean {
    return find(name) !== undefined;;
}

export {
    exists
};
