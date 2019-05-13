import DataType from '../DataType';
import Logger from '../Logger';

const blob: DataType = {
  mariadb: {
    equivalentNativeType: (path: [ string, string, string ], spec: any, logger: Logger): string => {
      const length: number = (('length' in spec) ? spec.length : 65535);
      if (Number.isNaN(length)) throw new Error('Non-numeric length received.');
      if (length < 0) throw new Error('Negative length received.');
      if (length === 0) throw new Error('Zero-length received.');
      if (length < 256) {
        logger.warn(path,
          `A fixblob or varblob with a length of ${2 ** length} bytes`
          + 'could have been used instead for better performance.');
      }
      if (length > ((2 ** 32) - 1)) {
        logger.warn(path, 'No native blob type can support a length of bytes. Defaulting to LONGBLOB.');
        return 'LONGBLOB';
      }
      return `BLOB(${length})`;
    },
    checkConstraints: (path: [ string, string, string ], spec: any): string[] => {
      const length: number = (('length' in spec) ? spec.length : 65535);
      if (Number.isNaN(length)) throw new Error('Non-numeric length received.');
      if (length < 0) throw new Error('Negative length received.');
      if (length === 0) throw new Error('Zero-length received.');
      return [
        `LENGTH(${path[2]}) < ${length}`,
      ];
    },
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default blob;
