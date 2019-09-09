const getServerURI = require("../../../dist/Commands/getServerURI.js").default;

describe("getServerURI", () => {
    test("getting the URI from a normal object", async () => {
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
        const uri = await getServerURI(server);
        expect(uri.uri).toEqual("mysql://example.host");
    });
});
