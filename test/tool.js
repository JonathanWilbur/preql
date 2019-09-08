const fs = require("fs");
const preql = require("../dist/index");
const pql = new preql.PreQLTranspiler();
const yaml = fs.readFileSync("./test/data/1.yaml", { encoding: "utf8" });

pql.transpile("mysql", yaml)
    .then((result) => {
        // eslint-disable-next-line
        console.log(result);
    });
