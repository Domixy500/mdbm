/*jslint beta*/
/*global
    log
    message
*/

const notify = function (text) {
    message("notify");
    message(text);
    log(text);
};

export {
    notify
};
