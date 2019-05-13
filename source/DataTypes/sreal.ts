import DataType from '../DataType';
import Logger from '../Logger';

const sreal: DataType = {
  mariadb: {
    equivalentNativeType: (path: [ string, string, string ], spec: any, logger: Logger): string => {
      const length: number = (('length' in spec) ? spec.length : 1);
      if (Number.isNaN(length)) throw new Error('Non-numeric length received.');
      if (length < 0) throw new Error('Negative length received.');
      if (length === 0) throw new Error('Zero-length received.');
      if (length <= 8) return 'FLOAT SIGNED';
      if (length <= 16) return 'FLOAT SIGNED';
      if (length <= 32) return 'FLOAT SIGNED';
      if (length <= 64) return 'DOUBLE SIGNED';
      logger.warn(path,
        `No native signed floating-point type can support ${length} bits. Defaulting to DOUBLE SIGNED.`);
      return 'DOUBLE SIGNED';
    },
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default sreal;
