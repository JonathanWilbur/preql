import DataType from '../DataType';
import Logger from '../Logger';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

const uint: DataType = {
  mariadb: {
    equivalentNativeType: (spec: AttributeSpec, logger: Logger): string => {
      if (!spec.length) return 'BIGINT UNSIGNED';
      if (spec.length === 1) {
        logger.warn(
          `Attribute '${spec.name}' of type 'uint' with a length `
          + 'of 1 has been transpiled to a BOOLEAN instead.',
        );
        return 'BOOLEAN';
      }
      if (spec.length <= 8) return 'TINYINT UNSIGNED';
      if (spec.length <= 16) return 'SMALLINT UNSIGNED';
      if (spec.length <= 32) return 'INTEGER UNSIGNED';
      if (spec.length <= 64) return 'BIGINT UNSIGNED';
      logger.warn(
        `No native signed integral type can support ${spec.length} bits for `
        + `attribute '${spec.name}'. Defaulting to BIGINT SIGNED.`,
      );
      return 'BIGINT UNSIGNED';
    },
    checkConstraints: (spec: AttributeSpec): string[] => {
      if (!spec.length) return [];
      if ([1, 8, 16, 32, 64].includes(spec.length)) return [];
      const max: number = (2 ** spec.length);
      return [`${spec.name} <= ${max}`];
    },
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default uint;
