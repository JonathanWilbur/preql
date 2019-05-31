import Logger from './Logger';
import AttributeSpec from './APIObjectKinds/Attribute/spec';

export default
interface NativeTypeProperties {
  equivalentNativeType (spec: AttributeSpec, logger: Logger): string;
  checkConstraints (spec: AttributeSpec, logger: Logger): string[];
  getters: (spec: AttributeSpec, logger: Logger) => { [ name: string ]: string };
  setters: (spec: AttributeSpec, logger: Logger) => { [ name: string ]: string };
};
