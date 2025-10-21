/*jslint beta*/
/*global*/

const json = {
    stringify
};

const parse = JSON.parse;

function stringify(object) {
    return JSON.stringify(object, null, 2);
}

export {
    parse,
    stringify
};
