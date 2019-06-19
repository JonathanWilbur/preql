import APIObjectDatabase from './Interfaces/APIObjectDatabase';
import Logger from './Interfaces/Logger';
declare type SuggestedTargetIndexHandler = (etcd: APIObjectDatabase, logger: Logger) => Promise<string>;
export default SuggestedTargetIndexHandler;
