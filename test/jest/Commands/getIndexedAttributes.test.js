const getIndexedAttributes = require("../../../dist/Commands/getIndexedAttributes.js").default;
const indexObjects = require("../../../dist/Commands/indexObjects.js").default;
const validateNamespace = require("../../../dist/Commands/validateNamespace.js").default;
const validateObject = require("../../../dist/Commands/validateObject.js").default;

describe("getIndexedAttributes", () => {
    test("truthfully returns indexed attributes", async () => {
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
                kind: "PlainIndex",
                metadata: {
                    name: "bindex",
                },
                spec: {
                    databaseName: "database",
                    structName: "struct",
                    name: "bindex",
                    keyAttributes: [
                        {
                            name: "b",
                        },
                    ],
                },
            },
        ];
        await Promise.all(objects.map(validateObject));
        const namespaces = await indexObjects(objects);
        await Promise.all(Object.values(namespaces).map(validateNamespace));
        const indexed = await getIndexedAttributes(namespaces.default);
        expect(Object.entries(indexed.attributes)[0][1]).toEqual(false);
        expect(Object.entries(indexed.attributes)[1][1]).toEqual(true);
    });
});
