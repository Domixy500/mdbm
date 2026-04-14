function assignEmptyString(acc: StringDict, key: string): StringDict {
    acc[key] = "";
    return acc;
}

function stringDictFromKeys(keys: string[]): StringDict {
    return keys.reduce(assignEmptyString, {});
}

function toJson(object: any): string{
    return JSON.stringify(object, null, 2);
}

export {
    stringDictFromKeys,
    toJson
};
