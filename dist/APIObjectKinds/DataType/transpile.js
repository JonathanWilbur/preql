"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const printf_1 = __importDefault(require("./printf"));
const transpile = (target, dataType, attribute) => {
    if (!(target in dataType.spec.targets)) {
        throw new Error(`Data type '${dataType.metadata.name}' cannot be transpiled for target '${target}'.`);
    }
    const targetSpec = dataType.spec.targets[target];
    if (targetSpec.returnBasedOnLength && attribute.spec.length) {
        const attributeLength = attribute.spec.length;
        const thresholdLengths = Object.keys(targetSpec.returnBasedOnLength)
            .map((key) => Number.parseInt(key, 10))
            .filter((key) => Number.isSafeInteger(key)) // To get rid of NaNs that somehow slip through.
            .sort((a, b) => (a - b));
        const smallestContainingThresholdLength = thresholdLengths
            .find((switchLength) => (attributeLength <= switchLength));
        if (!smallestContainingThresholdLength) { // If no threshold length can contain, just use the largest one.
            const smallestAccomodatingType = targetSpec
                .returnBasedOnLength[thresholdLengths[thresholdLengths.length - 1]];
            // logger.warn(
            //   `Attribute '${attribute.metadata.name}'s length was too large for the largest `
            //   + `'${dataType.metadata.name}', so it has been transpiled to a '${smallestAccomodatingType}'`,
            // );
            return printf_1.default(smallestAccomodatingType, attribute);
        }
        return printf_1.default(targetSpec.returnBasedOnLength[smallestContainingThresholdLength], attribute);
    }
    if (targetSpec.return)
        return printf_1.default(targetSpec.return, attribute);
    // This should also be checked in semantic validation.
    throw new Error(`Data type '${dataType.metadata.name}' has neither a 'return' property `
        + "nor a 'returnBasedOnLength' property. It must have one to transpile.");
};
exports.default = transpile;
