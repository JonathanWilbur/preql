import DataType from '../DataType';

const time: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'TIME',
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default time;
