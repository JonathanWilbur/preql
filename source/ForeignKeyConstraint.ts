export default
interface ForeignKeyConstraint {
  columns: string[];
  referenceTable: string;
  referenceColumns: string[];
}
