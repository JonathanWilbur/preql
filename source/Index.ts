import IndexKey from './IndexKey';

export default
interface Index {
  comment?: string;
  keys: IndexKey[];
  type: string;
};
