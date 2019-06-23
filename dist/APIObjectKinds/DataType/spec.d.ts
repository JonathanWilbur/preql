import Casing from './Casing';
import JSONType from './jsonTypes';
declare type Trim = {
    type: 'trim';
    side: string;
};
declare type Substring = {
    type: 'substring';
    from?: number | string;
    to?: number | string;
    reverse: boolean;
};
declare type Replace = {
    type: 'replace';
    mapping: Record<string, string>;
};
declare type Case = {
    type: 'case';
    casing: Casing;
};
declare type Pad = {
    type: 'pad';
    side: string;
    padString: string;
};
/**
 * The targets will be responsible for intelligently updating the attribute
 * with the correct data type.
*/
declare type Now = {
    type: 'now';
};
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
    setters?: (Trim | Substring | Replace | Case | Pad | Now)[];
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
export {};
