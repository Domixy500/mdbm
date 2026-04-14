import { entries } from "./entries";

function syncProperty(activeEntry: Entry, propertyName: string): void {
    const value = activeEntry.field(propertyName);
    entries(activeEntry).forEach(
        (x) => x.set(propertyName, value)
    );
}
    
export {
    syncProperty
};