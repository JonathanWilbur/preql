const indexObjects = require("../../../dist/Commands/indexObjects.js").default;
const validateNamespace = require("../../../dist/Commands/validateNamespace.js").default;

describe("validateNamespace", () => {
    const consistentObjects = [
        {
            apiVersion: "preql/1.0.0",
            kind: "CharacterSet",
            metadata: {
                name: "testeroo",
            },
            spec: {
                name: "utf8",
                targetEquivalents: {
                    "mariadb": "utf8",
                },
                defaultCollation: "latin1csas",
            },
        },
        {
            apiVersion: "preql/1.0.0",
            kind: "Collation",
            metadata: {
                name: "testeroo",
            },
            spec: {
                name: "latin1csas",
                targetEquivalents: {
                    "mariadb": "latin1csas",
                },
                characterSet: "utf8",
            },
        },
        {
            apiVersion: "preql/1.0.0",
            kind: "DataType",
            metadata: {
                name: "varchar64",
            },
            spec: {
                jsonEquivalent: "string",
                targets: {
                    mariadb: {
                        nativeType: "VARCHAR(64)",
                    },
                },
            },
        },
        {
            apiVersion: "preql/1.0.0",
            kind: "Server",
            metadata: {
                name: "testeroo",
            },
            spec: {
                name: "hosty",
                protocol: "mysql",
                hostname: "server.com",
                characterSet: "utf8",
                collation: "latin1csas",
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
                characterSet: "utf8",
                collation: "latin1csas",
            },
        },
        {
            apiVersion: "preql/1.0.0",
            kind: "Struct",
            metadata: {
                name: "testeroo",
            },
            spec: {
                name: "struct",
                databaseName: "database",
                entityName: "entity",
                characterSet: "utf8",
                collation: "latin1csas",
            },
        },
        {
            apiVersion: "preql/1.0.0",
            kind: "Attribute",
            metadata: {
                name: "attribute1",
            },
            spec: {
                databaseName: "database",
                structName: "struct",
                entityName: "entity",
                name: "name",
                type: "varchar64",
                characterSet: "utf8",
                collation: "latin1csas",
            },
        },
        {
            apiVersion: "preql/1.0.0",
            kind: "Attribute",
            metadata: {
                name: "attribute2",
            },
            spec: {
                databaseName: "database",
                structName: "struct",
                entityName: "entity",
                name: "secondName",
                type: "varchar64",
                nullable: true, // TODO: This was required for some reason. Research.
                characterSet: "utf8",
                collation: "latin1csas",
            },
        },
        {
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
                    name: "Wilbur",
                },
            },
        },
        {
            apiVersion: "preql/1.0.0",
            kind: "Entity",
            metadata: {
                name: "testeroo",
            },
            spec: {
                name: "entity",
                rootStruct: "struct",
                databaseName: "database",
            },
        },
        {
            apiVersion: "preql/1.0.0",
            kind: "Struct",
            metadata: {
                name: "struct2",
            },
            spec: {
                name: "struct2",
                databaseName: "database",
                entityName: "entity",
                characterSet: "utf8",
                collation: "latin1csas",
            },
        },
        {
            apiVersion: "preql/1.0.0",
            kind: "ForeignKey",
            metadata: {
                name: "testeroo",
            },
            spec: {
                databaseName: "database",
                parentStructName: "struct",
                childStructName: "struct2",
                name: "name",
            },
        },
        {
            apiVersion: "preql/1.0.0",
            kind: "PlainIndex",
            metadata: {
                name: "testeroo",
            },
            spec: {
                name: "plain_index",
                structName: "struct",
                entityName: "entity",
                databaseName: "database",
                clustered: true,
                keyAttributes: [
                    {
                        name: "name",
                        ascending: true,
                    },
                ],
                includedAttributes: [
                    {
                        name: "secondName",
                        ascending: true,
                    },
                ],
            },
        },
        {
            apiVersion: "preql/1.0.0",
            kind: "UniqueIndex",
            metadata: {
                name: "testeroo",
            },
            spec: {
                name: "unique_index",
                structName: "struct",
                entityName: "entity",
                databaseName: "database",
                clustered: true,
                keyAttributes: [
                    {
                        name: "name",
                        ascending: true,
                    },
                ],
                includedAttributes: [
                    {
                        name: "secondName",
                        ascending: true,
                    },
                ],
            },
        },
        {
            apiVersion: "preql/1.0.0",
            kind: "TextIndex",
            metadata: {
                name: "testeroo",
            },
            spec: {
                name: "text_index",
                structName: "struct",
                entityName: "entity",
                databaseName: "database",
                clustered: true,
                keyAttributes: [
                    {
                        name: "name",
                        ascending: true,
                    },
                ],
                includedAttributes: [
                    {
                        name: "secondName",
                        ascending: true,
                    },
                ],
            },
        },
        {
            apiVersion: "preql/1.0.0",
            kind: "SpatialIndex",
            metadata: {
                name: "testeroo",
            },
            spec: {
                name: "spatial_index",
                structName: "struct",
                entityName: "entity",
                databaseName: "database",
                clustered: true,
                keyAttributes: [
                    {
                        name: "name",
                        ascending: true,
                    },
                ],
                includedAttributes: [
                    {
                        name: "secondName",
                        ascending: true,
                    },
                ],
            },
        },
    ];

    test("CharacterSet must refer to an existing Collation", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.characterset[0];
        const original = referringObject.spec.defaultCollation;
        expect(original).toBeTruthy();
        referringObject.spec.defaultCollation = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.defaultCollation = original;
    });

    test("Collation must refer to an existing CharacterSet", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.collation[0];
        const original = referringObject.spec.characterSet;
        expect(original).toBeTruthy();
        referringObject.spec.characterSet = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.characterSet = original;
    });

    test("Server must refer to an existing CharacterSet", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.server[0];
        const original = referringObject.spec.characterSet;
        expect(original).toBeTruthy();
        referringObject.spec.characterSet = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.characterSet = original;
    });

    test("Server must refer to an existing Collation", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.server[0];
        const original = referringObject.spec.collation;
        expect(original).toBeTruthy();
        referringObject.spec.collation = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.collation = original;
    });

    test("Database must refer to an existing CharacterSet", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.database[0];
        const original = referringObject.spec.characterSet;
        expect(original).toBeTruthy();
        referringObject.spec.characterSet = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.characterSet = original;
    });

    test("Database must refer to an existing Collation", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.database[0];
        const original = referringObject.spec.collation;
        expect(original).toBeTruthy();
        referringObject.spec.collation = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.collation = original;
    });

    test("Entity must refer to an existing Database", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.entity[0];
        const original = referringObject.spec.databaseName;
        expect(original).toBeTruthy();
        referringObject.spec.databaseName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.databaseName = original;
    });

    test("Struct must refer to an existing CharacterSet", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.struct[0];
        const original = referringObject.spec.characterSet;
        expect(original).toBeTruthy();
        referringObject.spec.characterSet = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.characterSet = original;
    });

    test("Struct must refer to an existing Collation", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.struct[0];
        const original = referringObject.spec.collation;
        expect(original).toBeTruthy();
        referringObject.spec.collation = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.collation = original;
    });

    test("Struct must refer to an existing Database", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.struct[0];
        const original = referringObject.spec.databaseName;
        expect(original).toBeTruthy();
        referringObject.spec.databaseName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.databaseName = original;
    });

    test("Struct must refer to an existing Entity", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.struct[0];
        const original = referringObject.spec.entityName;
        expect(original).toBeTruthy();
        referringObject.spec.entityName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.entityName = original;
    });

    test("Attribute must refer to an existing CharacterSet", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.attribute[0];
        const original = referringObject.spec.characterSet;
        expect(original).toBeTruthy();
        referringObject.spec.characterSet = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.characterSet = original;
    });

    test("Attribute must refer to an existing Collation", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.attribute[0];
        const original = referringObject.spec.collation;
        expect(original).toBeTruthy();
        referringObject.spec.collation = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.collation = original;
    });

    test("Attribute must refer to an existing Database", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.attribute[0];
        const original = referringObject.spec.databaseName;
        expect(original).toBeTruthy();
        referringObject.spec.databaseName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.databaseName = original;
    });

    test("Attribute must refer to an existing Entity", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.attribute[0];
        const original = referringObject.spec.entityName;
        expect(original).toBeTruthy();
        referringObject.spec.entityName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.entityName = original;
    });

    test("Attribute must refer to an existing Struct", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.attribute[0];
        const original = referringObject.spec.structName;
        expect(original).toBeTruthy();
        referringObject.spec.structName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.structName = original;
    });

    test("Attribute must refer to an existing DataType", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.attribute[0];
        const original = referringObject.spec.type;
        expect(original).toBeTruthy();
        referringObject.spec.type = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.type = original;
    });

    test("ForeignKey must refer to an existing Database", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.foreignkey[0];
        const original = referringObject.spec.databaseName;
        expect(original).toBeTruthy();
        referringObject.spec.databaseName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.databaseName = original;
    });

    test("ForeignKey.parentStructName must refer to an existing Struct", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.foreignkey[0];
        const original = referringObject.spec.parentStructName;
        expect(original).toBeTruthy();
        referringObject.spec.parentStructName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.parentStructName = original;
    });

    test("ForeignKey.childStructName must refer to an existing Struct", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.foreignkey[0];
        const original = referringObject.spec.childStructName;
        expect(original).toBeTruthy();
        referringObject.spec.childStructName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.childStructName = original;
    });

    test("Entry must refer to an existing Database", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.entry[0];
        const original = referringObject.spec.databaseName;
        expect(original).toBeTruthy();
        referringObject.spec.databaseName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.databaseName = original;
    });

    test("Entry must refer to an existing Struct", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.entry[0];
        const original = referringObject.spec.structName;
        expect(original).toBeTruthy();
        referringObject.spec.structName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.structName = original;
    });

    test("Entry must refer to an existing Attribute", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.entry[0];
        const original = referringObject.spec.values;
        expect(original).toBeTruthy();
        referringObject.spec.values = {
            "nonexistent": "Wilbur",
        };
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.values = original;
    });

    test("PlainIndex must refer to an existing Database", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.plainindex[0];
        const original = referringObject.spec.databaseName;
        expect(original).toBeTruthy();
        referringObject.spec.databaseName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.databaseName = original;
    });

    test("PlainIndex must refer to an existing Entity", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.plainindex[0];
        const original = referringObject.spec.entityName;
        expect(original).toBeTruthy();
        referringObject.spec.entityName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.entityName = original;
    });

    test("PlainIndex must refer to an existing Struct", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.plainindex[0];
        const original = referringObject.spec.structName;
        expect(original).toBeTruthy();
        referringObject.spec.structName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.structName = original;
    });

    test("PlainIndex.keyAttributes must refer to existing Attributes", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.plainindex[0];
        const original = referringObject.spec.keyAttributes;
        expect(original).toBeTruthy();
        referringObject.spec.keyAttributes = [
            {
                name: "nonexistent",
                ascending: true,
            },
        ];
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.keyAttributes = original;
    });

    test("PlainIndex.includedAttributes must refer to existing Attributes", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.plainindex[0];
        const original = referringObject.spec.includedAttributes;
        expect(original).toBeTruthy();
        referringObject.spec.includedAttributes = [
            {
                name: "nonexistent",
                ascending: true,
            },
        ];
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.includedAttributes = original;
    });

    test("UniqueIndex must refer to an existing Database", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.uniqueindex[0];
        const original = referringObject.spec.databaseName;
        expect(original).toBeTruthy();
        referringObject.spec.databaseName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.databaseName = original;
    });

    test("UniqueIndex must refer to an existing Entity", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.uniqueindex[0];
        const original = referringObject.spec.entityName;
        expect(original).toBeTruthy();
        referringObject.spec.entityName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.entityName = original;
    });

    test("UniqueIndex must refer to an existing Struct", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.uniqueindex[0];
        const original = referringObject.spec.structName;
        expect(original).toBeTruthy();
        referringObject.spec.structName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.structName = original;
    });

    test("UniqueIndex.keyAttributes must refer to existing Attributes", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.uniqueindex[0];
        const original = referringObject.spec.keyAttributes;
        expect(original).toBeTruthy();
        referringObject.spec.keyAttributes = [
            {
                name: "nonexistent",
                ascending: true,
            },
        ];
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.keyAttributes = original;
    });

    test("UniqueIndex.includedAttributes must refer to existing Attributes", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.uniqueindex[0];
        const original = referringObject.spec.includedAttributes;
        expect(original).toBeTruthy();
        referringObject.spec.includedAttributes = [
            {
                name: "nonexistent",
                ascending: true,
            },
        ];
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.includedAttributes = original;
    });

    test("TextIndex must refer to an existing Database", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.textindex[0];
        const original = referringObject.spec.databaseName;
        expect(original).toBeTruthy();
        referringObject.spec.databaseName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.databaseName = original;
    });

    test("TextIndex must refer to an existing Entity", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.textindex[0];
        const original = referringObject.spec.entityName;
        expect(original).toBeTruthy();
        referringObject.spec.entityName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.entityName = original;
    });

    test("TextIndex must refer to an existing Struct", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.textindex[0];
        const original = referringObject.spec.structName;
        expect(original).toBeTruthy();
        referringObject.spec.structName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.structName = original;
    });

    test("TextIndex.keyAttributes must refer to existing Attributes", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.textindex[0];
        const original = referringObject.spec.keyAttributes;
        expect(original).toBeTruthy();
        referringObject.spec.keyAttributes = [
            {
                name: "nonexistent",
                ascending: true,
            },
        ];
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.keyAttributes = original;
    });

    test("TextIndex.includedAttributes must refer to existing Attributes", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.textindex[0];
        const original = referringObject.spec.includedAttributes;
        expect(original).toBeTruthy();
        referringObject.spec.includedAttributes = [
            {
                name: "nonexistent",
                ascending: true,
            },
        ];
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.includedAttributes = original;
    });

    test("SpatialIndex must refer to an existing Database", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.spatialindex[0];
        const original = referringObject.spec.databaseName;
        expect(original).toBeTruthy();
        referringObject.spec.databaseName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.databaseName = original;
    });

    test("SpatialIndex must refer to an existing Entity", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.spatialindex[0];
        const original = referringObject.spec.entityName;
        expect(original).toBeTruthy();
        referringObject.spec.entityName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.entityName = original;
    });

    test("SpatialIndex must refer to an existing Struct", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.spatialindex[0];
        const original = referringObject.spec.structName;
        expect(original).toBeTruthy();
        referringObject.spec.structName = "nonexistent";
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.structName = original;
    });

    test("SpatialIndex.keyAttributes must refer to existing Attributes", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.spatialindex[0];
        const original = referringObject.spec.keyAttributes;
        expect(original).toBeTruthy();
        referringObject.spec.keyAttributes = [
            {
                name: "nonexistent",
                ascending: true,
            },
        ];
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.keyAttributes = original;
    });

    test("SpatialIndex.includedAttributes must refer to existing Attributes", async () => {
        const consistentIndex = await indexObjects(consistentObjects);
        expect(validateNamespace(consistentIndex.default)).resolves.toBeTruthy();
        const referringObject = consistentIndex.default.kindIndex.spatialindex[0];
        const original = referringObject.spec.includedAttributes;
        expect(original).toBeTruthy();
        referringObject.spec.includedAttributes = [
            {
                name: "nonexistent",
                ascending: true,
            },
        ];
        expect(validateNamespace((await indexObjects(consistentObjects)).default)).rejects.toThrow();
        referringObject.spec.includedAttributes = original;
    });
});
