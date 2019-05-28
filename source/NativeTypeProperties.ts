import Logger from './Logger';

export default
interface NativeTypeProperties {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  equivalentNativeType (path: [ string, string, string ], spec: any, logger: Logger): string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkConstraints (path: [ string, string, string ], spec: any, logger: Logger): string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getters: (path: [ string, string, string ], spec: any, logger: Logger) => { [ name: string ]: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setters: (path: [ string, string, string ], spec: any, logger: Logger) => { [ name: string ]: string };
};
