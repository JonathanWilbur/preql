import APIObject from '../../Interfaces/APIObject';
import Spec from './spec';
import AttributeSpec from '../Attribute/spec';
import EnumSpec from '../Enum/spec';
import printf from './printf';

export default function
transpileDataType(target: string, dataType: APIObject<Spec>, attribute: APIObject<AttributeSpec | EnumSpec>): string {
  if (!(target in dataType.spec.targets)) {
    throw new Error(`Data type '${dataType.metadata.name}' cannot be transpiled for target '${target}'.`);
  }
  const targetSpec = dataType.spec.targets[target];
  if (targetSpec.returnBasedOnLength && attribute.spec.length) {
    const attributeLength: number = attribute.spec.length;
    const thresholdLengths: number[] = Object.keys(targetSpec.returnBasedOnLength)
      .map((key: string): number => Number.parseInt(key, 10))
      .filter((key: number): boolean => Number.isSafeInteger(key)) // To get rid of NaNs that somehow slip through.
      .sort((a: number, b: number): number => (a - b));
    const smallestContainingThresholdLength: number | undefined = thresholdLengths
      .find((switchLength: number) => (attributeLength <= switchLength));
    if (!smallestContainingThresholdLength) { // If no threshold length can contain, just use the largest one.
      const smallestAccomodatingType: string = targetSpec
        .returnBasedOnLength[thresholdLengths[thresholdLengths.length - 1]];
      // logger.warn(
      //   `Attribute '${attribute.metadata.name}'s length was too large for the largest `
      //   + `'${dataType.metadata.name}', so it has been transpiled to a '${smallestAccomodatingType}'`,
      // );
      return printf(smallestAccomodatingType, attribute);
    }
    return printf(targetSpec.returnBasedOnLength[smallestContainingThresholdLength], attribute);
  }
  if (targetSpec.return) return printf(targetSpec.return, attribute);
  // This should also be checked in semantic validation.
  throw new Error(
    `Data type '${dataType.metadata.name}' has neither a 'return' property `
    + "nor a 'returnBasedOnLength' property. It must have one to transpile.",
  );
};
