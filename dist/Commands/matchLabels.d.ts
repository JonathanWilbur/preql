import APIObject from '../Interfaces/APIObject';
/**
 * Evaluates whether an APIObject matches a label selector.
 *
 * @param labels The labels to match.
 * @param apiObject The object to be evaluated for a match.
 */
export default function matchLabels(labels: {
    [name: string]: string;
}, apiObject: APIObject): Promise<{
    allLabelsCaseSensitiveMatch: boolean;
    allLabelsCaseInsensitiveMatch: boolean;
    allLabelsFound: boolean;
    labels: {
        [name: string]: string;
    };
    apiObject: APIObject;
}>;