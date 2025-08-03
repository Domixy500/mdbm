/*jslint beta*/
/*global*/

import {type} from "./type";

function value(e) {
    return e.field(
        type(e)
    );
}

export {
    value
};
