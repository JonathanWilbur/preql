import Casing from '../../Casing';

export default
interface Attribute {
  name: string;
  structName: string;
  entityName?: string;
  databaseName: string;
  comment?: string;
  default?: string | number;
  nullable: boolean;
  type: string;
  length?: number;
  casing? : Casing;
  multiValued: boolean;
};
