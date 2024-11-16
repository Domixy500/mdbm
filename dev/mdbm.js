//import { myExport } from "/module.js";
const myExport = require('./module.js');

const mdbm = (function () {
  function test() {
    message(myExport.test());
  }

  return Object.freeze({
    "test": test
  });
}());
