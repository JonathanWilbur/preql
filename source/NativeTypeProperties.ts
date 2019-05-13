import Logger from './Logger';

export default
interface NativeTypeProperties {
  equivalentNativeType (path: [ string, string, string ], spec: any, logger: Logger): string;
  checkConstraints (path: [ string, string, string ], spec: any, logger: Logger): string[];
  getters: (path: [ string, string, string ], spec: any, logger: Logger)
  => { [ name: string ]: string };
  setters: (path: [ string, string, string ], spec: any, logger: Logger)
  => { [ name: string ]: string };
};
