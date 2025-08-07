/*jslint beta*/
/*global*/

import {createEntry} from "@app";

function addAttribute(e, attr) {
    const property = libByName("Property").create({});
    property.set("Label", attr.field("Label"));
    property.set("Type", attr.field("Type"));
    property.set("Order", attr.field("Order"));
    property.link("Object", e);
}

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
    attributes.forEach(
        (x) => addAttribute(object, x)
    );
    
    return object;
}

function setPrototype(object, prototype) {
    object.set("Prototype", [prototype]);
}

export {
    fromPrototype
};
