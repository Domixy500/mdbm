function createEntry(libraryName: string): Entry {
    const library = libByName(libraryName);
    const newEntry = library.create({});
    return newEntry;
}

function getEntry(libraryName: string, id: string): Entry {
    const library = libByName(libraryName);
    return library.findById(id);
}

export {
    createEntry,
    getEntry
}
