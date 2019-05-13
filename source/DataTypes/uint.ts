import DataType from '../DataType';
import Logger from '../Logger';

const uint: DataType = {
  mariadb: {
    equivalentNativeType: (path: [ string, string, string ], spec: any, logger: Logger): string => {
      const length: number = (('length' in spec) ? spec.length : 1);
      if (Number.isNaN(length)) throw new Error('Non-numeric length received.');
      if (length < 0) throw new Error('Negative length received.');
      if (length === 0) throw new Error('Zero-length received.');
      if (length === 1) {
        logger.warn(path, 'uint with a length of 1 has been transpiled to a BOOLEAN.');
        return 'BOOLEAN';
      }
      if (length <= 8) return 'TINYINT UNSIGNED';
      if (length <= 16) return 'SMALLINT UNSIGNED';
      if (length <= 32) return 'INTEGER UNSIGNED';
      if (length <= 64) return 'BIGINT UNSIGNED';
      logger.warn(path, `No native unsigned integral type can support ${length} bits. Defaulting to BIGINT UNSIGNED.`);
      return 'BIGINT UNSIGNED';
    },
    checkConstraints: (path: [ string, string, string ], spec: any): string[] => {
      const length: number = (('length' in spec) ? spec.length : 1);
      if (Number.isNaN(length)) throw new Error('Non-numeric length received.');
      if (length < 0) throw new Error('Negative length received.');
      if (length === 0) throw new Error('Zero-length received.');
      if ([1, 8, 16, 32, 64].includes(length)) return [];
      const max: number = (2 ** length);
      return [`${path[2]} <= ${max}`];
    },
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default uint;
