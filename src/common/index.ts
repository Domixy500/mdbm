function assignEmptyString(acc: StringDict, key: string): StringDict {
    acc[key] = "";
    return acc;
}

function stringDictFromKeys(keys: string[]): StringDict {
    return keys.reduce(assignEmptyString, {});
}

export {
    stringDictFromKeys
};
