const mdbm = (function () {
  const settings = initSettings();

  function initSettings() {
    let settingsEntry;
  }

  function getId() {

  }

  function test() {
    message("abc");
  }

  return Object.freeze({
    "test": test
  });
}());
