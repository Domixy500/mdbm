function create(typeName: string): void {
    const library = libByName(typeName);
    library.create();
}

export default Object.freeze({
    create
});
