"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kind_1 = __importDefault(require("./Attribute/kind"));
const kind_2 = __importDefault(require("./CharacterSet/kind"));
const kind_3 = __importDefault(require("./Collation/kind"));
const kind_4 = __importDefault(require("./Database/kind"));
const kind_5 = __importDefault(require("./DataType/kind"));
const kind_6 = __importDefault(require("./Entity/kind"));
const kind_7 = __importDefault(require("./Entry/kind"));
const kind_8 = __importDefault(require("./ForeignKey/kind"));
const kind_9 = __importDefault(require("./PlainIndex/kind"));
const kind_10 = __importDefault(require("./Postamble/kind"));
const kind_11 = __importDefault(require("./Preamble/kind"));
const kind_12 = __importDefault(require("./Server/kind"));
const kind_13 = __importDefault(require("./SpatialIndex/kind"));
const kind_14 = __importDefault(require("./Struct/kind"));
const kind_15 = __importDefault(require("./TextIndex/kind"));
const kind_16 = __importDefault(require("./UniqueIndex/kind"));
const kinds = {
    database: kind_4.default,
    entity: kind_6.default,
    struct: kind_14.default,
    attribute: kind_1.default,
    plainindex: kind_9.default,
    uniqueindex: kind_16.default,
    textindex: kind_15.default,
    spatialindex: kind_13.default,
    server: kind_12.default,
    preamble: kind_11.default,
    postamble: kind_10.default,
    foreignkey: kind_8.default,
    datatype: kind_5.default,
    entry: kind_7.default,
    characterset: kind_2.default,
    collation: kind_3.default,
};
exports.default = kinds;
//# sourceMappingURL=index.js.map