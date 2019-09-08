"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Evaluates whether an APIObject matches a label selector.
 *
 * @param labels The labels to match.
 * @param obj The object to be evaluated for a match.
 */
async function matchLabels(labels, obj) {
    const result = {
        allLabelsCaseSensitiveMatch: true,
        allLabelsCaseInsensitiveMatch: true,
        allLabelsFound: true,
        labels,
        apiObject: obj,
    };
    Object.entries(labels).forEach((entry) => {
        if (!(entry[0] in obj.metadata.labels)) {
            result.allLabelsCaseInsensitiveMatch = false;
            result.allLabelsCaseSensitiveMatch = false;
            result.allLabelsFound = false;
        }
        if (entry[1] !== obj.metadata.labels[entry[0]]) {
            result.allLabelsCaseSensitiveMatch = false;
        }
        if (entry[1].toLowerCase() !== obj.metadata.labels[entry[0]].toLowerCase()) {
            result.allLabelsCaseInsensitiveMatch = false;
        }
    });
    return result;
}
exports.default = matchLabels;
//# sourceMappingURL=matchLabels.js.map