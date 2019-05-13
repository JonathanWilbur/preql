import DataType from '../DataType';

const geometry: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'GEOMETRY',
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default geometry;
