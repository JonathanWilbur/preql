export default
interface Spec {
  category: string;
  lengthUnits?: string;
  regexes?: {
    [ regexType: string ]: {
      [ groupName: string ]: {
        pattern: string;
        positive: boolean;
      }[]
    };
  };
  targets: {
    [ targetName: string ]: {
      return?: string;
      returnBasedOnLength?: {
        [ length: number ]: string;
      };
      check?: string[];
      setters?: string[];
      objectIdentifier?: string;
      ldapMatchingRule?: string;
      ldapOrderingRule?: string;
      ldapsubstringMatchingRule?: string;
      sup?: string; // See: http://www.openldap.org/doc/admin22/schema.html
    }
  }
};
