import object from "object";

function toast(text: string): void {
    message(text);
}

export default Object.freeze({
    object,
    toast
});
