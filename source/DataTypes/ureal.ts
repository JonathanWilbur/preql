import DataType from '../DataType';
import Logger from '../Logger';

const ureal: DataType = {
  mariadb: {
    equivalentNativeType: (path: [ string, string, string ], spec: any, logger: Logger): string => {
      const length: number = (('length' in spec) ? spec.length : 1);
      if (Number.isNaN(length)) throw new Error('Non-numeric length received.');
      if (length < 0) throw new Error('Negative length received.');
      if (length === 0) throw new Error('Zero-length received.');
      if (length <= 8) return 'FLOAT UNSIGNED';
      if (length <= 16) return 'FLOAT UNSIGNED';
      if (length <= 32) return 'FLOAT UNSIGNED';
      if (length <= 64) return 'DOUBLE UNSIGNED';
      logger.warn(path,
        `No native unsigned floating-point type can support ${length} bits. Defaulting to DOUBLE UNSIGNED.`);
      return 'DOUBLE UNSIGNED';
    },
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default ureal;
