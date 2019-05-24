import Column from './Column';
import ForeignKeyConstraint from './ForeignKeyConstraint';
import Index from './IndexCrap';

export default
interface Table {
  columns: { [ name: string ]: Column };
  comment?: string;
  foreignkeys?: ForeignKeyConstraint[];
  implements?: string[];
  indexes?: { [ name: string ]: Index };
};
