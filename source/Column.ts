import Casing from './Casing';

export default
interface Column {
  comment?: string;
  default?: string | number;
  nullable: boolean;
  type: string;
  length?: number;
  casing? : Casing;
}
