const mdbm = (function () {
  function test() {
    message("test2");
  }

  return Object.freeze({
    "test": test
  });
}());
