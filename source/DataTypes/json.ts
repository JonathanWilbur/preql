import DataType from '../DataType';

const json: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'LONGTEXT',
    checkConstraints: (path: [ string, string, string ]): string[] => [
      `JSON_VALID(${path[2]})`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default json;
