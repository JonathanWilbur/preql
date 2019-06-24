import Casing from './Casing';
import JSONType from './jsonTypes';
declare type Trim = {
    type: 'trim';
    side: string;
};
declare type Substring = {
    type: 'substring';
    fromIndex: number;
    toIndex?: number;
};
declare type Replace = {
    type: 'replace';
    from: string;
    to: string;
};
declare type Case = {
    type: 'case';
    casing: Casing;
};
declare type Pad = {
    type: 'pad';
    side: string;
    padLength: number;
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
    setters?: (Trim & Substring & Replace & Case & Pad & Now)[];
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
