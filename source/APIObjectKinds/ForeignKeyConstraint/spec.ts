interface KeyReference {
  attributeName: string;
};

interface ForeignKeyReference {
  struct: string;
  key: KeyReference[];
};

export default
interface Spec {
  name: string;
  databaseName: string;
  child: ForeignKeyReference;
  parent: ForeignKeyReference;
  onDeleteAction: string;
  onUpdateAction: string;
};
