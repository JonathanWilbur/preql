import DataType from '../DataType';

const fixchar: DataType = {
  mariadb: {
    // TODO: Check that spec.length exists.
    equivalentNativeType: (path: [ string, string, string ], spec: any): string => `CHAR(${spec.length})`,
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default fixchar;
