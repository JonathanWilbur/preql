const getPath = require("../../../dist/Commands/getPath.js").default;

describe("getPath", () => {
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
    test("encoding of an Attribute", async () => {
        expect(await getPath(attribute)).toEqual("database.struct.name");
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
    test("encoding of a Database", async () => {
        expect(await getPath(database)).toEqual("name");
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
    test("encoding of an Entity", async () => {
        expect(await getPath(entity)).toEqual("database.$name");
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
    test("encoding of an Attribute", async () => {
        expect(await getPath(struct)).toEqual("database.name");
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
    test("encoding of a PlainIndex", async () => {
        expect(await getPath(plainindex)).toEqual("database.struct.name");
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
    test("encoding of a UniqueIndex", async () => {
        expect(await getPath(uniqueindex)).toEqual("database.struct.name");
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
    test("encoding of a TextIndex", async () => {
        expect(await getPath(textindex)).toEqual("database.struct.name");
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
    test("encoding of a SpatialIndex", async () => {
        expect(await getPath(spatialindex)).toEqual("database.struct.name");
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
    test("encoding of a Server", async () => {
        expect(await getPath(server)).not.toBeDefined();
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
    test("encoding of a Preamble", async () => {
        expect(await getPath(preamble)).not.toBeDefined();
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
    test("encoding of a Postamble", async () => {
        expect(await getPath(postamble)).not.toBeDefined();
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
            type: "sint8",
        },
    };
    test("encoding of a ForeignKey", async () => {
        expect(await getPath(foreignkey)).toEqual("database.child.name");
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
    test("encoding of a DataType", async () => {
        expect(await getPath(datatype)).not.toBeDefined();
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
    test("encoding of an Entry", async () => {
        expect(await getPath(entry)).toEqual("database.struct.1");
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
    test("encoding of a CharacterSet", async () => {
        expect(await getPath(characterset)).toEqual("utf8");
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
    test("encoding of a Collation", async () => {
        expect(await getPath(collation)).toEqual("latin1csas");
    });
});
