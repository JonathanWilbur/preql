const validateObject = require("../../../dist/Commands/validateObject.js").default;

describe("validateObject", () => {
    const attribute = {
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
    };
    test("validation of an Attribute", async () => {
        expect(await validateObject(attribute)).toStrictEqual(true);
    });

    const database = {
        apiVersion: "preql/1.0.0",
        kind: "Database",
        metadata: {
            name: "testeroo",
        },
        spec: {
            name: "name",
        },
    };
    test("validation of a Database", async () => {
        expect(await validateObject(database)).toStrictEqual(true);
    });

    const entity = {
        apiVersion: "preql/1.0.0",
        kind: "Entity",
        metadata: {
            name: "testeroo",
        },
        spec: {
            databaseName: "database",
            name: "name",
            rootStruct: "rooty",
        },
    };
    test("validation of an Entity", async () => {
        expect(await validateObject(entity)).toStrictEqual(true);
    });

    const struct = {
        apiVersion: "preql/1.0.0",
        kind: "Struct",
        metadata: {
            name: "testeroo",
        },
        spec: {
            databaseName: "database",
            name: "name",
        },
    };
    test("validation of an Attribute", async () => {
        expect(await validateObject(struct)).toStrictEqual(true);
    });

    const plainindex = {
        apiVersion: "preql/1.0.0",
        kind: "PlainIndex",
        metadata: {
            name: "testeroo",
        },
        spec: {
            databaseName: "database",
            structName: "struct",
            name: "name",
            clustered: true,
            keyAttributes: [
                {
                    name: "ka1",
                    ascending: true,
                },
            ],
        },
    };
    test("validation of a PlainIndex", async () => {
        expect(await validateObject(plainindex)).toStrictEqual(true);
    });

    const uniqueindex = {
        apiVersion: "preql/1.0.0",
        kind: "UniqueIndex",
        metadata: {
            name: "testeroo",
        },
        spec: {
            databaseName: "database",
            structName: "struct",
            name: "name",
            clustered: true,
            keyAttributes: [
                {
                    name: "ka1",
                    ascending: true,
                },
            ],
        },
    };
    test("validation of a UniqueIndex", async () => {
        expect(await validateObject(uniqueindex)).toStrictEqual(true);
    });

    const textindex = {
        apiVersion: "preql/1.0.0",
        kind: "TextIndex",
        metadata: {
            name: "testeroo",
        },
        spec: {
            databaseName: "database",
            structName: "struct",
            name: "name",
            clustered: true,
            keyAttributes: [
                {
                    name: "ka1",
                    ascending: true,
                },
            ],
        },
    };
    test("validation of a TextIndex", async () => {
        expect(await validateObject(textindex)).toStrictEqual(true);
    });

    const spatialindex = {
        apiVersion: "preql/1.0.0",
        kind: "SpatialIndex",
        metadata: {
            name: "testeroo",
        },
        spec: {
            databaseName: "database",
            structName: "struct",
            name: "name",
            clustered: true,
            keyAttributes: [
                {
                    name: "ka1",
                    ascending: true,
                },
            ],
        },
    };
    test("validation of a SpatialIndex", async () => {
        expect(await validateObject(spatialindex)).toStrictEqual(true);
    });

    const server = {
        apiVersion: "preql/1.0.0",
        kind: "Server",
        metadata: {
            name: "testeroo",
        },
        spec: {
            name: "name",
            protocol: "mysql",
            hostname: "example.host",
        },
    };
    test("validation of a Server", async () => {
        expect(await validateObject(server)).toStrictEqual(true);
    });

    const preamble = {
        apiVersion: "preql/1.0.0",
        kind: "Preamble",
        metadata: {
            name: "testeroo",
        },
        spec: {
            uncommentedText: "texteroo",
        },
    };
    test("validation of a Preamble", async () => {
        expect(await validateObject(preamble)).toStrictEqual(true);
    });

    const postamble = {
        apiVersion: "preql/1.0.0",
        kind: "Postamble",
        metadata: {
            name: "testeroo",
        },
        spec: {
            uncommentedText: "texteroo",
        },
    };
    test("validation of a Postamble", async () => {
        expect(await validateObject(postamble)).toStrictEqual(true);
    });

    const foreignkey = {
        apiVersion: "preql/1.0.0",
        kind: "ForeignKey",
        metadata: {
            name: "testeroo",
        },
        spec: {
            databaseName: "database",
            parentStructName: "parent",
            childStructName: "child",
            name: "name",
        },
    };
    test("validation of a ForeignKey", async () => {
        expect(await validateObject(foreignkey)).toStrictEqual(true);
    });

    const datatype = {
        apiVersion: "preql/1.0.0",
        kind: "DataType",
        metadata: {
            name: "testeroo",
        },
        spec: {
            jsonEquivalent: "string",
            targets: {
                mariadb: {
                    nativeType: "string",
                },
            },
        },
    };
    test("validation of a DataType", async () => {
        expect(await validateObject(datatype)).toStrictEqual(true);
    });

    const entry = {
        apiVersion: "preql/1.0.0",
        kind: "Entry",
        metadata: {
            name: "testeroo",
        },
        spec: {
            databaseName: "database",
            structName: "struct",
            id: 1,
            values: {
                value: 42,
            },
        },
    };
    test("validation of an Entry", async () => {
        expect(await validateObject(entry)).toStrictEqual(true);
    });

    const characterset = {
        apiVersion: "preql/1.0.0",
        kind: "CharacterSet",
        metadata: {
            name: "testeroo",
        },
        spec: {
            name: "utf8",
            targetEquivalents: {
                mariadb: "utf8",
            },
        },
    };
    test("validation of a CharacterSet", async () => {
        expect(await validateObject(characterset)).toStrictEqual(true);
    });

    const collation = {
        apiVersion: "preql/1.0.0",
        kind: "Collation",
        metadata: {
            name: "testeroo",
        },
        spec: {
            name: "latin1csas",
            targetEquivalents: {
                mariadb: "latin_1_cs_as",
            },
        },
    };
    test("validation of a Collation", async () => {
        expect(await validateObject(collation)).toStrictEqual(true);
    });
});
