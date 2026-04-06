function toast(text: string) {
    message(text)
}

const foo = toast;

export default Object.freeze({
    abc: foo,
    toast
});
