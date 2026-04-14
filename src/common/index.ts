function assignEmptyString(acc: StringDict, key: string): StringDict {
    acc[key] = "";
    return acc;
}

function findKeyByValue(dict: StringDict, value: string): string | undefined {
    return Object.entries(dict).find(([_, v]) => v === value)?.[0];
}

function stringDictFromKeys(keys: string[]): StringDict {
    return keys.reduce(assignEmptyString, {});
}

function toJson(object: any): string{
    return JSON.stringify(object, null, 2);
}

export {
    findKeyByValue,
    stringDictFromKeys,
    toJson
};
