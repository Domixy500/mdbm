const mdbm = (function () {
  function test() {
    message("abc");
  }

  return Object.freeze({
    "test": test
  });
}());
