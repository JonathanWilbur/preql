import DataType from '../DataType';

const polygon: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'POLYGON',
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default polygon;
