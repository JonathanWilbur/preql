import DataType from '../DataType';

const iri: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'TEXT',
    checkConstraints: (path: [ string, string, string ]): string[] => [
      `${path[2]} RLIKE '^[A-Za-z][A-Za-z0-9\\+\\.\\-]+:\\W+$'`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default iri;
