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
    targets: {
        [targetName: string]: {
            return?: string;
            returnBasedOnLength?: {
                [length: number]: string;
            };
            check?: string[];
            setters?: string[];
            objectIdentifier?: string;
            ldapMatchingRule?: string;
            ldapOrderingRule?: string;
            ldapsubstringMatchingRule?: string;
            sup?: string;
        };
    };
}
