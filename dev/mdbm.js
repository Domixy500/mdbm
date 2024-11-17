const mdbm = (function () {
  const data = Object.create(null);

  function generateId() {
    const lastId = settings().field("lastId");
    const nextId = lastId + 1;
    settings().set("lastId", nextId);
    return nextId.toString(36);
  }

  function typeNames(e) {
    return Array(e.field("mdbm.types"));
  }

  function settings() {
    return data.settings || libByName("mdbm").entries()[0];
  }

  function test() {
    message("abc");
  }

  return Object.freeze({
    "generateId": generateId,
    "test": test
  });
}());
