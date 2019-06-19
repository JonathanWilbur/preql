import APIObject from './Interfaces/APIObject';
import Logger from './Interfaces/Logger';
declare type SuggestedTargetObjectHandler = (obj: APIObject, logger: Logger) => Promise<string>;
export default SuggestedTargetObjectHandler;
