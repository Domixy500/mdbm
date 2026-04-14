function createEntry(libraryName: string) {
    const library = libByName(libraryName);
    const newEntry = library.create({});
    return newEntry;
}

export {
    createEntry
}
