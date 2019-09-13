const matchLabels = require("../../../dist/Commands/matchLabels.js").default;

describe("matchLabels", () => {
    test("a matching object matches with case-matching labels", async () => {
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
        const match = await matchLabels({ sensitive: "true" }, server);
        expect(match.allLabelsCaseSensitiveMatch).toStrictEqual(true);
        expect(match.allLabelsCaseInsensitiveMatch).toStrictEqual(true);
        expect(match.allLabelsFound).toStrictEqual(true);
    });

    test("a matching object matches with case-differing labels", async () => {
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
        const match = await matchLabels({ sensitive: "TRUE" }, server);
        expect(match.allLabelsCaseSensitiveMatch).toStrictEqual(false);
        expect(match.allLabelsCaseInsensitiveMatch).toStrictEqual(true);
        expect(match.allLabelsFound).toStrictEqual(true);
    });

    test("not all labels are found when excess labels are queried", async () => {
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
        const match = await matchLabels({
            sensitive: "true",
            expensive: "false",
        }, server);
        expect(match.allLabelsCaseSensitiveMatch).toStrictEqual(false);
        expect(match.allLabelsCaseInsensitiveMatch).toStrictEqual(false);
        expect(match.allLabelsFound).toStrictEqual(false);
    });

    test("all labels are found when a subset of labels are queried", async () => {
        const server = {
            apiVersion: "preql/1.0.0",
            kind: "Server",
            metadata: {
                name: "testeroo",
                labels: {
                    sensitive: "true",
                    expensive: "false",
                },
            },
            spec: {
                name: "name",
                protocol: "mysql",
                hostname: "example.host",
            },
        };
        const match = await matchLabels({ sensitive: "true" }, server);
        expect(match.allLabelsCaseSensitiveMatch).toStrictEqual(true);
        expect(match.allLabelsCaseInsensitiveMatch).toStrictEqual(true);
        expect(match.allLabelsFound).toStrictEqual(true);
    });

    test("a non-matching object does not matches with case-matching labels", async () => {
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
        const match = await matchLabels({ sensitive: "true" }, server);
        expect(match.allLabelsCaseSensitiveMatch).toStrictEqual(true);
        expect(match.allLabelsCaseInsensitiveMatch).toStrictEqual(true);
        expect(match.allLabelsFound).toStrictEqual(true);
    });
});
