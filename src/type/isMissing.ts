import {exists} from "./exists";

function isMissing(name: string): boolean {
    return !exists(name);
}

export {
    isMissing
};
