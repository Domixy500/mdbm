/*jslint beta*/
/*global*/

import {createEntry} from "@app";

function addType(object, prototype) {
    const basedOn = prototype.field("basedOn");
    object.link("Type", prototype);
    if (basedOn.length === 1) {
        addType(object, basedOn[0]);
    }
}

function fromPrototype(prototype) {
    const attributes = prototype.field("Attributes");
    const object = createEntry("Object");
    addType(object, prototype);
    setPrototype(object, prototype);
}

function setPrototype(object, prototype) {
    object.set("Prototype", [prototype]);
}

export {
    fromPrototype
};
