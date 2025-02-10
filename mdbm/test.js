const i = "";
const ii = '{"Object": "a1", "Item": "a2"}';

const create = {
  Item: "a2",
  Smartphone: "a3"
};

function newEntryIds(libraries) {
  const ids = R.fromPairs(
    libraries.map((x) => [x, null])
  );
  return ids;
}

function addMissingLibraries(input) {
  const libraries = ["Object", "Item", "Smartphone"];
  return R.merge(newEntryIds(libraries), input);
}

function setCurrentLibraryId(input) {
  if (input.Object === null) {
    input.Object = "a1";
  }
  return input;
}

function readEntryIds(input) {
  return (
    input === ""
    ? {}
    : JSON.parse(input)
  );
}

function createMissingEntry(value, key) {
  return (
    value === null
    ? create[key]
    : value
  );
}

function createMissingEntries(input) {
  return R.mapObjIndexed(createMissingEntry, input)
}

function entryIds(input) {
  return R.pipe(
    readEntryIds,
    addMissingLibraries,
    setCurrentLibraryId,
    createMissingEntries
  )(input);
}

const result = {
  Object: "a1",
  Item: "a2",
  Smartphone: "a3"
};

console.log(entryIds(i));
console.log(entryIds(ii));