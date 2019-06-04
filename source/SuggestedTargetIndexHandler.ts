import APIObjectDatabase from './Interfaces/APIObjectDatabase';
import Logger from './Interfaces/Logger';

type SuggestedTargetIndexHandler = (etcd: APIObjectDatabase, logger: Logger) => Promise<string>;

// eslint-disable-next-line no-undef
export default SuggestedTargetIndexHandler;
