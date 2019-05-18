import Column from './Column';
import Index from './Index';

export default
interface Table {
  columns: { [ name: string ]: Column };
  comment?: string;
  implements?: string[];
  indexes?: { [ name: string ]: Index };
};
