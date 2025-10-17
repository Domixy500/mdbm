/*jslint beta*/
/*global*/

const messages = {
    alreadyExists,
    isMissing
};

function alreadyExists(x) {
    return "Type '" + x + "' does already exist!";
}

function isMissing(x) {
    return "Type '" + x + "' does not exist!";
}

export {
    messages
};
