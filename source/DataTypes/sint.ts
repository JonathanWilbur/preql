import DataType from '../DataType';
import Logger from '../Logger';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

const sint: DataType = {
  mariadb: {
    equivalentNativeType: (spec: AttributeSpec, logger: Logger): string => {
      if (!spec.length) return 'BIGINT SIGNED';
      if (spec.length === 1) {
        logger.warn(
          `Attribute '${spec.name}' of type 'sint' with a length `
          + 'of 1 has been transpiled to a BOOLEAN instead.',
        );
        return 'BOOLEAN';
      }
      if (spec.length <= 8) return 'TINYINT SIGNED';
      if (spec.length <= 16) return 'SMALLINT SIGNED';
      if (spec.length <= 32) return 'INTEGER SIGNED';
      if (spec.length <= 64) return 'BIGINT SIGNED';
      logger.warn(
        `No native signed integral type can support ${spec.length} bits for `
        + `attribute '${spec.name}'. Defaulting to BIGINT SIGNED.`,
      );
      return 'BIGINT SIGNED';
    },
    checkConstraints: (spec: AttributeSpec): string[] => {
      if (!spec.length) return [];
      if ([1, 8, 16, 32, 64].includes(spec.length)) return [];
      const max: number = ((2 ** (spec.length - 1)) - 1);
      const min: number = -((2 ** (spec.length - 1)));
      return [`${spec.name} <= ${max} AND ${spec.name} >= ${min}`];
    },
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default sint;
