const matchLabels = require("../../../dist/Commands/matchLabels.js").default;

describe("matchLabels", () => {
    test("a matching object", async () => {
        const server = {
            apiVersion: "preql/1.0.0",
            kind: "Server",
            metadata: {
                name: "testeroo",
                labels: {
                    sensitive: "true",
                },
            },
            spec: {
                name: "name",
                protocol: "mysql",
                hostname: "example.host",
            },
        };
        expect((await matchLabels({ sensitive: "true" }, server)).allLabelsCaseSensitiveMatch).toStrictEqual(true);
    });

    test("a non-matching object", async () => {
        const server = {
            apiVersion: "preql/1.0.0",
            kind: "Server",
            metadata: {
                name: "testeroo",
                labels: {
                    sensitive: "true",
                },
            },
            spec: {
                name: "name",
                protocol: "mysql",
                hostname: "example.host",
            },
        };
        expect((await matchLabels({ sensitive: "false" }, server)).allLabelsCaseSensitiveMatch).toStrictEqual(false);
    });
});
