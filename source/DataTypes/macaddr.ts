import DataType from '../DataType';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

const macaddr: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'VARCHAR(17)',
    checkConstraints: (spec: AttributeSpec): string[] => [
      `${spec.name} REGEXP '^[A-Fa-f0-9]{2}(?::[A-Fa-f0-9]{2}){5}$' `
      + `OR ${spec.name} REGEXP '^[A-Fa-f0-9]{2}(?:-[A-Fa-f0-9]{2}){5}$' `
      + `OR ${spec.name} REGEXP '^[A-Fa-f0-9]{6}(:|-)?[A-Fa-f0-9]{6}$' `
      + `OR ${spec.name} REGEXP '^[A-Fa-f0-9]{4}.[A-Fa-f0-9]{4}.[A-Fa-f0-9]{4}$'`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (spec: AttributeSpec): { [ name: string ]: string } => ({
      uppercase: `UPPER(${spec.name})`,
    }),
  },
};

export default macaddr;
