function createEntry(libraryName) {
    const library = libByName(libraryName);
    const newEntry = library.create({});
    return newEntry;
}
function getEntry(libraryName, id) {
    const library = libByName(libraryName);
    return library.findById(id);
}
export { createEntry, getEntry };
