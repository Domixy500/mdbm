/*jslint beta*/
/*global*/

import {create} from "./create";
import {entries} from "./entries";
import {exists} from "./exists";
import {find} from "./find";
import {isMissing} from "./isMissing";
import {onCreate} from "./onCreate.js";

const type = {
    create,
    entries,
    exists,
    find,
    isMissing,
    onCreate
};

export {
    type
};
