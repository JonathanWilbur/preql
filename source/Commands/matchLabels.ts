import APIObject from "../Interfaces/APIObject";

/**
 * Evaluates whether an APIObject matches a label selector.
 *
 * @param labels The labels to match.
 * @param obj The object to be evaluated for a match.
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
