import DataType from '../DataType';

const varchar: DataType = {
  mariadb: {
    // TODO: Check for spec.length.
    equivalentNativeType: (path: [ string, string, string ], spec: any): string => `VARCHAR(${spec.length})`,
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default varchar;
