/*jslint beta*/
/*global*/

function entry() {
    const fields = {
        mdbmCurrentLibrary: "abc"
    };

    function field(fieldName) {
        return fields[fieldName];
    }

    function set(fieldName, newValue) {
        fields[fieldName] = newValue;
    }

    return {
        field,
        set
    }
}