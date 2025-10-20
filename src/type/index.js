/*jslint beta*/
/*global*/

import {check} from "./check";
import {create} from "./create";
import {entries} from "./entries";
import {exists} from "./exists";
import {find} from "./find";
import {idObject} from "./idObjects";
import {isMissing} from "./isMissing";
import {messages} from "./messages.js";
import {onCreate} from "./onCreate.js";

const type = {
    check,
    create,
    idObject,
    isMissing,
    messages,
    onCreate
};

export {
    type
};
