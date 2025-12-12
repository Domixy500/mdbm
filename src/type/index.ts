import {isMissing} from "./isMissing";
import {fromEntry} from "./fromEntry";

type Type = {
    name: () => string;
};

export {
    fromEntry,
    isMissing
};
