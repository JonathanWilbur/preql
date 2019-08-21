import Casing from './Casing';
import IntegerOverflowBehavior from './IntegerOverflowBehavior';

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

interface NumberSpec {
  minimum?: number;
  maximum?: number;
  targets: TargetMap;
  overflowBehavior: IntegerOverflowBehavior;
  underflowBehavior: IntegerOverflowBehavior;
};

interface StringSpec {
  minLength?: number;
  maxLength?: number;
  regexes?: {
    [ regexType: string ]: {
      [ groupName: string ]: {
        pattern: string;
        positive: boolean;
      }[]
    };
  };
  setters?: (Trim & Substring & Replace & Case & Pad & Now)[];
  targets: TargetMap;
};

/**
 * Enum length will be the length of the largest value.
 * Type will typically be CHAR or NCHAR.
 * Length will be limited to 32.
 * Get rid of the Enum kind and just put it in DataType.
 */
interface EnumSpec {
  name: string;
  values: string[];
};

interface TargetMap {
  [ targetName: string ]: {
    nativeType: string;
    ldapMatchingRule?: string;
    ldapOrderingRule?: string;
    ldapSubstringMatchingRule?: string;
    sup?: string; // See: http://www.openldap.org/doc/admin22/schema.html
  };
};

export default
interface Spec extends NumberSpec, StringSpec, EnumSpec {
  jsonEquivalent: string;
};
