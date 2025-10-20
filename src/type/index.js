/*jslint beta*/
/*global*/

import {check} from "./check";
import {create} from "./create";
import {entries} from "./entries";
import {exists} from "./exists";
import {find} from "./find";
import {emptyIds} from "./emptyIds";
import {isMissing} from "./isMissing";
import {messages} from "./messages.js";
import {onCreate} from "./onCreate.js";

const type = {
    check,
    create,
    emptyIds,
    isMissing,
    messages,
    onCreate
};

export {
    type
};
