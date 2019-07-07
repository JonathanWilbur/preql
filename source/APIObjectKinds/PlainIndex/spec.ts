export default
interface Spec {
  name: string;
  structName: string;
  entityName?: string;
  databaseName: string;
  clustered: boolean;
  keyAttributes: {
    name: string;
    ascending: boolean;
  }[];
  includedAttributes?: {
    name: string;
    ascending: boolean;
  }[];
};
