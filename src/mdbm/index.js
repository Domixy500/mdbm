/*jslint beta*/
/*global*/

// do not use alias (@) on imports at entry point
// this would rollup resolve in: function(exports, _object) {
// _object is not known when calling the the iife
import {library} from "../library";
import {object} from "../object";
import {type} from "../type";

export {
    library,
    object,
    type
};
