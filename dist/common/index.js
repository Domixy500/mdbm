function assignEmptyString(acc, key) {
    acc[key] = "";
    return acc;
}
function findKeyByValue(dict, value) {
    var _a;
    return (_a = Object.entries(dict).find(([_, v]) => v === value)) === null || _a === void 0 ? void 0 : _a[0];
}
function stringDictFromKeys(keys) {
    return keys.reduce(assignEmptyString, {});
}
function toJson(object) {
    return JSON.stringify(object, null, 2);
}
export { findKeyByValue, stringDictFromKeys, toJson };
