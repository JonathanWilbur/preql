import DataType from '../DataType';
import Logger from '../Logger';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

const sreal: DataType = {
  mariadb: {
    equivalentNativeType: (spec: AttributeSpec, logger: Logger): string => {
      if (!spec.length) return 'DOUBLE SIGNED';
      if (spec.length <= 8) return 'FLOAT SIGNED';
      if (spec.length <= 16) return 'FLOAT SIGNED';
      if (spec.length <= 32) return 'FLOAT SIGNED';
      if (spec.length <= 64) return 'DOUBLE SIGNED';
      logger.warn(
        `No native signed floating-point type can support ${spec.length} bits `
        + `for attribute '${spec.name}'. Defaulting to DOUBLE SIGNED.`,
      );
      return 'DOUBLE SIGNED';
    },
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default sreal;
