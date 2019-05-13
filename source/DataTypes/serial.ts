import DataType from '../DataType';

const serial: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'SERIAL',
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default serial;
