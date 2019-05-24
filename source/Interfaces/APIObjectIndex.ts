import APIObject from './APIObject';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type APIObjectIndex = Map<string, APIObject<any>[]>;
// "no-undef" disabled on the next line because it appears to be a bug.
// eslint-disable-next-line no-undef
export default APIObjectIndex;
