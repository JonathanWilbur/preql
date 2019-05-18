import Casing from './Casing';

export default
interface Column {
  comment?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default?: any;
  nullable: boolean;
  type: string;
  length?: number;
  casing? : Casing;
}
