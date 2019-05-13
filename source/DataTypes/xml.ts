import DataType from '../DataType';

const xml: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'LONGTEXT',
    checkConstraints: (): string[] => [], // TODO: Add some more checks.
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default xml;
