import DataType from '../DataType';

const percent: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'DOUBLE UNSIGNED',
    checkConstraints: (path: [ string, string, string ]): string[] => [
      `${path[0]} <= 100.00000000`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default percent;
