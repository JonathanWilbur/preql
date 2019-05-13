import DataType from '../DataType';

const boolean: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'BOOLEAN',
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default boolean;
