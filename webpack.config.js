const path = require("path");

module.exports = {
    entry: [
        "./source/index.ts",
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "preql.min.js",
        library: "preql",
        libraryTarget: "var",
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.ts$/u,
                loader: "ts-loader",
                exclude: /node_modules/u,
            },
        ],
    },
    resolve: {
        extensions: [ ".ts", ".js" ],
    },
    optimization: {
        minimize: true,
    },
    target: "web",
};
