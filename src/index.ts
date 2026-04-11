function toast(text: string): void {
    message(text)
}

function test(libraryName: string): void {
    const library = libByName(libraryName);
    const entries = library.entries();
    toast(entries.length.toString());
}

export default Object.freeze({
    test,
    toast
});
