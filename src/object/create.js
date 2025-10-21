/*jslint beta*/
/*global*/

import {library} from "@library";
import {onCreate} from "./onCreate";

function create(libraryName) {
    const object = library.createEntry(libraryName);
    onCreate.open(
        object,
        library.get(libraryName)
    );
    onCreate.post(object);
    object.show();
}

export {
    create
};
