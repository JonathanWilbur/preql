import DataType from '../DataType';

// FIXME: BINARY(6), yet UPPER()? Wuuut?
const macaddr: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'BINARY(6)',
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (path: [ string, string, string ]): { [ name: string ]: string } => ({
      uppercase: `UPPER(${path[2]})`,
    }),
  },
};

export default macaddr;
