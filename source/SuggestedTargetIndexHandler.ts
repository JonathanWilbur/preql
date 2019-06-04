import APIObjectDatabase from './Interfaces/APIObjectDatabase';

type SuggestedTargetIndexHandler = (etcd: APIObjectDatabase) => Promise<string>;

// eslint-disable-next-line no-undef
export default SuggestedTargetIndexHandler;
