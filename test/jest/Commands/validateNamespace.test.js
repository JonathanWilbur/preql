const indexObjects = require("../../../dist/Commands/indexObjects.js").default;
const validateNamespace = require("../../../dist/Commands/validateNamespace.js").default;

describe("validateNamespace", () => {
    test("struct must refer to an existing database", async () => {
        const objects = [
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
                    name: "name",
                },
            },
        ];
        expect(validateNamespace(await indexObjects(objects))).rejects.toThrow();
    });

    // TODO: Test more collisions.
    // TODO: Test unknown types.
    // TODO: Test broken FKCs.
});
