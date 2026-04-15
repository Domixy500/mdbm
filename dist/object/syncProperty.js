import { entries } from "./entries";
function syncProperty(activeEntry, propertyName) {
    const value = activeEntry.field(propertyName);
    entries(activeEntry).forEach((x) => x.set(propertyName, value));
}
export { syncProperty };
