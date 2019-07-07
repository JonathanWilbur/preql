import Casing from './Casing';
import JSONType from './jsonTypes';

type Trim = {
  type: 'trim';
  side: string;
};

type Substring = {
  type: 'substring';
  fromIndex: number;
  toIndex?: number;
};

type Replace = {
  type: 'replace';
  from: string;
  to: string;
};

type Case = {
  type: 'case';
  casing: Casing;
};

type Pad = {
  type: 'pad';
  side: string;
  padLength: number;
  padString: string;
};

/**
 * The targets will be responsible for intelligently updating the attribute
 * with the correct data type.
*/
type Now = {
  type: 'now';
};

export default
interface Spec {
  jsonEquivalent: JSONType;
  syntaxObjectIdentifiers?: string[];
  lengthUnits?: string;
  minimum?: number;
  maximum?: number;
  regexes?: {
    [ regexType: string ]: {
      [ groupName: string ]: {
        pattern: string;
        positive: boolean;
      }[]
    };
  };
  setters?: (Trim & Substring & Replace & Case & Pad & Now)[];
  targets: {
    [ targetName: string ]: {
      return?: string;
      returnBasedOnLength?: {
        [ length: number ]: string;
      };
      objectIdentifier?: string;
      ldapMatchingRule?: string;
      ldapOrderingRule?: string;
      ldapsubstringMatchingRule?: string;
      sup?: string; // See: http://www.openldap.org/doc/admin22/schema.html
    };
  };
};
