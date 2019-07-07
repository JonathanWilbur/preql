"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIObjectKinds_1 = __importDefault(require("../APIObjectKinds"));
const PreqlError_1 = __importDefault(require("../PreqlError"));
async function validateNamespace(namespace) {
    // Ensure Unique distinguishedNames
    const encounteredDistinguishedNames = new Map([]);
    (namespace.kindIndex.entry || [])
        .filter((entry) => (typeof entry.spec.distinguishedName === 'string'))
        .forEach((entry) => {
        if (!entry.spec.distinguishedName)
            return;
        if (encounteredDistinguishedNames.has(entry.spec.distinguishedName.toLowerCase())) {
            const firstEntry = encounteredDistinguishedNames
                .get(entry.spec.distinguishedName.toLowerCase());
            throw new PreqlError_1.default('ee62701b-8d35-48f9-8d78-be0d8f3c80f3', `Duplicate Entry.distinguishedName '${entry.spec.distinguishedName}'. `
                + `The first Entry to have it was '${firstEntry.metadata.name}'. `
                + `The second Entry to have it was '${entry.metadata.name}'.`);
        }
        else {
            encounteredDistinguishedNames.set(entry.spec.distinguishedName.toLowerCase(), entry);
        }
    });
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
