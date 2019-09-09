const indexObjects = require("../../../dist/Commands/indexObjects.js").default;

describe("indexObjects", () => {
    test("metadata names are not permitted for matching types", async () => {
        const objects = [
            {
                apiVersion: "preql/1.0.0",
                kind: "Attribute",
                metadata: {
                    name: "testeroo",
                },
                spec: {
                    databaseName: "database",
                    structName: "struct",
                    name: "name",
                    type: "sint8",
                },
            },
            {
                apiVersion: "preql/1.0.0",
                kind: "Attribute",
                metadata: {
                    name: "testeroo",
                },
                spec: {
                    databaseName: "database",
                    structName: "struct",
                    name: "name",
                    type: "sint8",
                },
            },
        ];
        expect(indexObjects(objects)).rejects.toThrow();
    });

    // TODO: Test more collisions.
});
