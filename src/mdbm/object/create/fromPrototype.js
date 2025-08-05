/*jslint beta*/
/*global*/

import {createEntry} from "../../app";

function addType(object, prototype) {
    const basedOn = prototype.field("basedOn");
    object.link("Type", prototype);
    if(basedOn.length === 1) {
        addType(e, basedOn[0]);
    }
}

function fromPrototype(prototype) {
    const object = createEntry("Object");
    const attributes = prototype.field("Attributes");
    addType(object, prototype);
    setPrototype(object, prototype);
}

function setPrototype(object, prototype) {
    object.set("Prototype", [prototype]);
}

export {
    fromPrototype
};
