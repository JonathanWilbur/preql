import Table from './Table';

export default
interface Schema {
  tables?: { [ name: string ]: Table };
};
