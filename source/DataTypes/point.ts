import DataType from '../DataType';

const point: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'POINT',
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default point;
