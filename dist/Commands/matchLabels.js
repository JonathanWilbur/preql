"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Evaluates whether an APIObject matches a label selector.
 *
 * @param labels The labels to match.
 * @param apiObject The object to be evaluated for a match.
 */
async function matchLabels(labels, apiObject) {
    const result = {
        allLabelsCaseSensitiveMatch: true,
        allLabelsCaseInsensitiveMatch: true,
        allLabelsFound: true,
    };
    Object.entries(labels).forEach((entry) => {
        if (!(entry[0] in apiObject.metadata.labels)) {
            result.allLabelsCaseInsensitiveMatch = false;
            result.allLabelsCaseSensitiveMatch = false;
            result.allLabelsFound = false;
        }
        if (entry[1] !== apiObject.metadata.labels[entry[0]]) {
            result.allLabelsCaseSensitiveMatch = false;
        }
        if (entry[1].toLowerCase() !== apiObject.metadata.labels[entry[0]].toLowerCase()) {
            result.allLabelsCaseInsensitiveMatch = false;
        }
    });
    return result;
}
exports.default = matchLabels;
;
