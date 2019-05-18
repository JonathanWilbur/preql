import Schema from './Schema';
import Column from './Column';

export default
interface PreqlSchema {
  interfaces?: { [ name: string ]: { [ columnName: string] : Column } };
  schema?: { [ name: string ]: Schema };
};
