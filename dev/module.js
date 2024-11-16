function test() {
  return "mod";
}

const myExport = {"test": test};

//export { myExport };

module.exports = myExport;
