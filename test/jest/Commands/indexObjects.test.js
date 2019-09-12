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

    test("metadata names are permitted for non-matching types", async () => {
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
                kind: "Struct",
                metadata: {
                    name: "testeroo",
                },
                spec: {
                    databaseName: "database",
                    name: "struct",
                },
            },
        ];
        expect(indexObjects(objects)).resolves.toBeTruthy();
    });

    test("path collisions are caught and rejected", async () => {
        const objects = [
            {
                apiVersion: "preql/1.0.0",
                kind: "Attribute",
                metadata: {
                    name: "testeroo1",
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
                    name: "testeroo2",
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

    test("Entity path collisions are caught and rejected", async () => {
        const objects = [
            {
                apiVersion: "preql/1.0.0",
                kind: "Entity",
                metadata: {
                    name: "testeroo1",
                },
                spec: {
                    databaseName: "database",
                    name: "name",
                },
            },
            {
                apiVersion: "preql/1.0.0",
                kind: "Entity",
                metadata: {
                    name: "testeroo2",
                },
                spec: {
                    databaseName: "database",
                    name: "name",
                },
            },
        ];
        expect(indexObjects(objects)).rejects.toThrow();
    });
});
