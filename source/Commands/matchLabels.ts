import APIObject from "../Interfaces/APIObject";

// TODO: Add a return attribute indicating whether the matched object contained exclusively the searched labels.
/**
 * Evaluates whether an APIObject matches a label selector. Returns an object
 * containing details about the nature or extent of the matching.
 *
 * In the returned object:
 *
 * - `allLabelsCaseSensitiveMatch` indicates whether all of the labels match
 *   and match casing exactly.
 * - `allLabelsCaseInsensitiveMatch` indicates whether all of the labels match
 *   after permitting deviations in casing.
 * - `allLabelsFound` indicates whether all of the matching labels were found
 *   in the object, regardless of whether their values matched.
 * - `labels` indicates the searched labels and their values.
 * - `apiObject` indicates the compared object.
 *
 * @param labels {object} The labels to match.
 * @param obj {APIObject} The object to be evaluated for a match.
 * @returns {Promise} A promised object whose attributes detail the nature or extent of the matching.
 */
export default
async function matchLabels (labels: { [name: string]: string }, obj: APIObject): Promise<{
    allLabelsCaseSensitiveMatch: boolean;
    allLabelsCaseInsensitiveMatch: boolean;
    allLabelsFound: boolean;
    labels: { [name: string]: string };
    apiObject: APIObject;
}> {
    const result = {
        allLabelsCaseSensitiveMatch: true,
        allLabelsCaseInsensitiveMatch: true,
        allLabelsFound: true,
        labels,
        apiObject: obj,
    };
    Object.entries(labels).forEach((entry: [string, string]): void => {
        if (!(entry[0] in obj.metadata.labels)) {
            result.allLabelsCaseInsensitiveMatch = false;
            result.allLabelsCaseSensitiveMatch = false;
            result.allLabelsFound = false;
            return;
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
