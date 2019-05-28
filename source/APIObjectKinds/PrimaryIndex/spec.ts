export default
interface Spec {
  clustered: boolean;
  keyColumns: {
    name: string;
    ascending: boolean;
  }[];
  includedColumns?: {
    name: string;
    ascending: boolean;
  }[];
};
