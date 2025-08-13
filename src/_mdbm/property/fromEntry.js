/*jslint beta*/
/*global*/

import {type} from "./type.js";
import {value} from "./value.js";
import {valueAsString} from "./valueAsString.js";

function fromEntry(e) {
    const property = {
        type: () => type(e),
        value: (newValue) => value(e, newValue),
        valueAsString: () => valueAsString(e)
    }
    
    return Object.freeze({
        property
    });
}

export {
    fromEntry
};
