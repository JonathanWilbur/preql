import APIObject from './APIObject';

export default
interface HandlerEvent {
  transpileTo: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ensureTheseThingsArePresent: APIObject<any>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ensureTheseThingsAreAbsent: APIObject<any>[];
};
