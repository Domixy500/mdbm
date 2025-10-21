/*jslint beta*/
/*global*/

const json = {
    parse,
    stringify
};

const parse = JSON.parse;

function stringify(object) {
    return JSON.stringify(object, null, 2);
}

export {
    json
};
