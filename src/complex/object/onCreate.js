/*jslint beta*/
/*global
    lib
*/

import {type} from "../type";

const onCreate = {
    open,
    post,
    pre
};

function open(e) {
    setMdbmType(e, lib().title);
}

function post() {
    
}

function pre(e) {
    
}

function setMdbmType(e, typeName) {
    const mdbmType = type.fromName(typeName);
    e.set("mdbm.Type", mdbmType);
}

export {
    onCreate
};
