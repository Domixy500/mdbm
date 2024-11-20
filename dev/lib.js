/*jslint*/
/*global
    libByName
    message
    R
    sql
*/

const mdbm = (function () {
  const data = Object.create(null);
  const template = R.curry(function (pattern, values) {
      const regex = new RegExp("\\$\\{(.*?)\\}", "g");
      return pattern.replace(
          regex,
          (match, key) => values[key] || match
      );
  });
  const queryDefinition = {
      "byIdType": {
          parameters: (id, type) => query.byIdType({"id": id, "type": type}),
          pattern: "SELECT id FROM \"${type}\" WHERE \"mdbm.id\" = \"${id}\""
      }
  };
  const query = R.map();

  function makeQuery(definition) {
      return function(...values) {
          return template(
              definition.pattern,
              definition.parameters(...values)
          );
      };
  }

  function entriesBySql(query) {
      return sql(query).asEntries();
  }

  function entryBySql(query) {
      return entriesBySql(query)[0];
  }

  function generateId() {
      const lastId = settings().field("lastId");
      const nextId = lastId + 1;
      settings().set("lastId", nextId);
      return nextId.toString(36);
  }

  function interfaceNames(e) {
      return R.map(
          R.identity,
          e.field("mdbm.interfaces")
      );
  }

  function interfaces(e) {
      const id = e.field("mdbm.id");
      return R.pipe(
          interfaceNames,
          R.map(interfaceQuery(id)),
          R.map(findOrCreateInterface(id))
      )(e);
  }

  function settings() {
      return data.settings || libByName("mdbm").entries()[0];
  }

  return Object.freeze({
      "generateId": generateId,
      "interfaces": interfaces,
      "query": query
  });
}());

const queryDefinition = {
  "byIdType": {
      parameters: (id, type) => Object.freeze({"id": id, "type": type}),
      pattern: "SELECT id FROM \"${type}\" WHERE \"mdbm.id\" = \"${id}\""
  }
};

const template = R.curry(function (pattern, values) {
  const regex = new RegExp("\\$\\{(.*?)\\}", "g");
  return pattern.replace(
      regex,
      (match, key) => values[key] || match
  );
});

function makeQuery(definition) {
  const numberOfParameters = definition.parameters.length;
  return R.curryN(numberOfParameters, function(...values) {
      return template(
          definition.pattern,
          definition.parameters(...values)
      );
  });
}

const query = R.map(makeQuery, queryDefinition);
console.log(query);
