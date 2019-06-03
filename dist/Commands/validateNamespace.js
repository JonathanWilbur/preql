"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIObjectKinds_1 = __importDefault(require("../APIObjectKinds"));
async function validateSemantics(namespaces) {
    // Iterate over namespaces
    return Promise.all(Array.from(namespaces.entries()).map(async (ns) => Promise.all(
    // Iterate over kinds in a namespace.
    Array.from(ns[1].kindIndex.entries()).map(async (k) => Promise.all(
    // Iterate over objects of that kind.
    k[1].map((obj) => {
        const kind = APIObjectKinds_1.default.get(k[0]);
        if (!kind)
            return Promise.resolve(); // Simply do nothing if the kind is not recognized.
        return kind.validateSemantics(obj, ns[1]);
    }))))));
}
exports.validateSemantics = validateSemantics;
;
async function validateNamespace(namespace) {
    // Iterate over kinds in a namespace.
    return Promise.all(Array.from(namespace.kindIndex.entries())
        .map(async (k) => Promise.all(
    // Iterate over objects of that kind.
    k[1].map((obj) => {
        const kind = APIObjectKinds_1.default.get(k[0]);
        if (!kind)
            return Promise.resolve(); // Simply do nothing if the kind is not recognized.
        return kind.validateSemantics(obj, namespace);
    }))));
}
exports.default = validateNamespace;
;
