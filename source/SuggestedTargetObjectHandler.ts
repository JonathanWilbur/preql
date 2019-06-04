import APIObject from './Interfaces/APIObject';
import Logger from './Interfaces/Logger';

type SuggestedTargetObjectHandler = (obj: APIObject, logger: Logger) => Promise<string>;

// eslint-disable-next-line no-undef
export default SuggestedTargetObjectHandler;
