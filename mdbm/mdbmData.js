/*jslint*/
/*global
    R
*/

const entry = function()

const data = {
    entryIds: "{Object: 1}",
    id: "a1",
    type: "Object"
};

// const s1 = {
//     entryIds: {
//         get: JSON.parse,
//         set: JSON.stringify
//     }
// };

// R.map(createDataField, {});

// function mdbmData(e) {
//     return {
//         entryIds,
//         id,
//         type
//     };
// }


// function createDataField(o) {
//     return function(newValue) {
//         return (
//             newValue === undefined
//             ? o.get(o.e, o.key)
//             : o.set(o.e, o.key, newValue)
//         );
//     }
// }

// const type = createGetterSetter(e, "type", );

// function type(e) {
//     return function(newValue) {
//         return (
//             newValue === undefined
//             ? getData(e, "type")
//             : setData(e, "type", newValue)
//         );
//     };
// }

// function id(e) {
//     return function(newValue) {
//         return (
//             newValue === undefined
//             ? getData(e, "id")
//             : setData(e, "id", newValue)
//         );
//     };
// }

// function entryIds(e) {
//     return function(newValue) {
//         return (
//             newValue === undefined
//             ? getData(e, "entryIds")
//             : setData(e, "entryIds", newValue)
//         );
//     };
// }