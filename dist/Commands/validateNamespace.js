"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIObjectKinds_1 = __importDefault(require("../APIObjectKinds"));
async function validateNamespace(namespace) {
    // Iterate over kinds in a namespace.
    return Promise.all(Object.entries(namespace.kindIndex)
        .map(async (k) => Promise.all(
    // Iterate over objects of that kind.
    k[1].map((obj) => {
        const kind = APIObjectKinds_1.default[k[0]];
        if (!kind)
            return Promise.resolve(); // Simply do nothing if the kind is not recognized.
        return kind.validateSemantics(obj, namespace);
    }))));
}
exports.default = validateNamespace;
;
