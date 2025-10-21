/*jslint beta*/
/*global*/

const json = {
    parse,
    stringify
};

function parse(jsonString) {
    return JSON.parse(jsonString);
}

function stringify(object) {
    return JSON.stringify(object, null, 2);
}

export {
    json
};
