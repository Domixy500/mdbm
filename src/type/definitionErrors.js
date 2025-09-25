/*jslint beta*/
/*global*/

import {isMissing} from "./isMissing";

function definitionErrors() {
    const validators = [
    value => value == null ? "Value is null or undefined." : null,
    value => typeof value === "string" && value.trim() === "" ? "String is empty." : null,
    value => Array.isArray(value) && value.length === 0 ? "Array is empty." : null,
    value => typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0
      ? "Object has no properties." : null
  ];
    return validators.map(
        fn => fn(value)
    ).filter(
        msg => msg !== null
    );
};

export {
    definitionErrors
};
