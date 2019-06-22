import Casing from './Casing';
import JSONType from './jsonTypes';
export default interface Spec {
    jsonEquivalent: JSONType;
    lengthUnits?: string;
    minimum?: number;
    maximum?: number;
    regexes?: {
        [regexType: string]: {
            [groupName: string]: {
                pattern: string;
                positive: boolean;
            }[];
        };
    };
    setters?: {
        trim?: {
            side: string;
        };
        substring?: {
            fromIndex?: number;
            toIndex?: number;
            reverse: boolean;
        };
        replace?: Record<string, string>;
        case?: {
            casing: Casing;
        };
        pad?: {
            side: string;
            padString: string;
        };
        /**
         * The targets will be responsible for intelligently updating the attribute
         * with the correct data type.
         */
        now?: {};
    };
    targets: {
        [targetName: string]: {
            return?: string;
            returnBasedOnLength?: {
                [length: number]: string;
            };
            objectIdentifier?: string;
            ldapMatchingRule?: string;
            ldapOrderingRule?: string;
            ldapsubstringMatchingRule?: string;
            sup?: string;
        };
    };
}
