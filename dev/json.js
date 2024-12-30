function fromJson(json) {
    return JSON.parse(json, (key, value) => {
        if (typeof value === "string" && value.startsWith("function")) {
            return eval(`(${value})`);
        }
        return value;
    });
}

function toJson(obj) {
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === "function") {
            return value.toString();
        }
        return value;
    });
}
