const getEntries = require("../../../dist/Commands/getEntries.js").default;
const indexObjects = require("../../../dist/Commands/indexObjects.js").default;
const validateNamespace = require("../../../dist/Commands/validateNamespace.js").default;
const validateObject = require("../../../dist/Commands/validateObject.js").default;

describe("getEntries", () => {
    test("truthfully returns entries", async () => {
        const objects = [
            {
                apiVersion: "preql/1.0.0",
                kind: "DataType",
                metadata: {
                    name: "sint8",
                },
                spec: {
                    jsonEquivalent: "integer",
                    targets: {
                        mariadb: {
                            nativeType: "tinyint",
                        },
                    },
                },
            },
            {
                apiVersion: "preql/1.0.0",
                kind: "Database",
                metadata: {
                    name: "testeroo",
                },
                spec: {
                    name: "database",
                },
            },
            {
                apiVersion: "preql/1.0.0",
                kind: "Struct",
                metadata: {
                    name: "testeroo",
                },
                spec: {
                    databaseName: "database",
                    name: "struct",
                },
            },
            {
                apiVersion: "preql/1.0.0",
                kind: "Attribute",
                metadata: {
                    name: "a",
                },
                spec: {
                    databaseName: "database",
                    structName: "struct",
                    name: "a",
                    type: "sint8",
                },
            },
            {
                apiVersion: "preql/1.0.0",
                kind: "Attribute",
                metadata: {
                    name: "b",
                },
                spec: {
                    databaseName: "database",
                    structName: "struct",
                    name: "b",
                    type: "sint8",
                },
            },
            {
                apiVersion: "preql/1.0.0",
                kind: "Entry",
                metadata: {
                    name: "badboi",
                },
                spec: {
                    databaseName: "database",
                    structName: "struct",
                    id: 1,
                    values: {
                        a: 2,
                        b: 3,
                    },
                },
            },
        ];
        await Promise.all(objects.map(validateObject));
        const namespaces = await indexObjects(objects);
        await Promise.all(Object.values(namespaces).map(validateNamespace));
        const entries = await getEntries(namespaces.default);
        expect(entries.entries.database.struct.length).toEqual(1);
    });
});
