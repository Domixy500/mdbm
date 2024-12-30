// Serialize objects with functions (including nested ones)
function toJson(obj) {
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === "function") {
            // Mark the function with a special prefix to distinguish it
            return { _isFunction: true, value: value.toString() };
        }
        return value; // Leave other values unchanged
    });
}

// Deserialize objects with functions (including nested ones)
function fromJson(json) {
    return JSON.parse(json, (key, value) => {
        if (value && value._isFunction) {
            // Convert the string back into a function
            return eval(`(${value.value})`); // Convert string back to function
        }
        return value; // Leave other values unchanged
    });
}
