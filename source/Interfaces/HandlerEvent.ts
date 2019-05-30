import APIObject from './APIObject';

export default
interface HandlerEvent {
  transpileTo: string;
  objects: APIObject[];
  namespace?: string;
};
