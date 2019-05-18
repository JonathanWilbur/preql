export default
interface IndexKey {
  column: string;
  references?: { column: string, table: string };
  ascending: boolean;
};
