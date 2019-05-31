import DataType from '../DataType';
import Logger from '../Logger';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

const ureal: DataType = {
  mariadb: {
    equivalentNativeType: (spec: AttributeSpec, logger: Logger): string => {
      if (!spec.length) return 'DOUBLE UNSIGNED';
      if (spec.length <= 8) return 'FLOAT UNSIGNED';
      if (spec.length <= 16) return 'FLOAT UNSIGNED';
      if (spec.length <= 32) return 'FLOAT UNSIGNED';
      if (spec.length <= 64) return 'DOUBLE UNSIGNED';
      logger.warn(
        `No native unsigned floating-point type can support ${spec.length} bits `
        + `for attribute '${spec.name}'. Defaulting to DOUBLE UNSIGNED.`,
      );
      return 'DOUBLE UNSIGNED';
    },
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default ureal;
