export default
interface Spec {
  databaseName: string;
  structName: string;
  distinguishedName?: string;
  values: { [ name: string ]: boolean | number | string };
};
