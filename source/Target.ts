import APIObjectIndex from './Interfaces/APIObjectDatabase';

export default
interface Target {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transpile: (apiObjectIndex: APIObjectIndex) => string;
  // TODO: delete, since order of deletion will vary from transpilation.
};
