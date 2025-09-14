var mdbm = function(exports) {
    "use strict";
    function checkAccess() {
        libByName("Object");
        libByName("mdbm.Type");
    }
    const onOpen = {
        post: post
    };
    function post(library) {
        checkAccess();
    }
    const library = {
        onOpen: onOpen
    };
    exports.library = library;
    return exports;
}({});
//# sourceMappingURL=mdbm-debug.js.map
