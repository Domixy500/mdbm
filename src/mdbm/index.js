/*jslint beta*/
/*global
    log
    message
*/

const notify = function (text) {
    message(text);
    log(text);
};

export {
    notify
};
