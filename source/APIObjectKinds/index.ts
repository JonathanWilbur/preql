import DatabaseKind from './Database/kind';
import EntityKind from './Entity/kind';
import StructKind from './Struct/kind';
import AttributeKind from './Attribute/kind';
import PrimaryIndexKind from './PrimaryIndex/kind';
import PlainIndexKind from './PlainIndex/kind';
import UniqueIndexKind from './UniqueIndex/kind';
import TextIndexKind from './TextIndex/kind';
import SpatialIndexKind from './SpatialIndex/kind';
import ServerKind from './Server/kind';
import PreambleKind from './Preamble/kind';
import PostambleKind from './Postamble/kind';
import ForeignKeyConstraintKind from './ForeignKeyConstraint/kind';
import DataTypeKind from './DataType/kind';
import EntryKind from './Entry/kind';
import CharacterSetKind from './CharacterSet/kind';
import CollationKind from './Collation/kind';
import APIObjectKind from '../Interfaces/APIObjectKind';

const kinds: Record<string, APIObjectKind> = {
  database: DatabaseKind,
  entity: EntityKind,
  struct: StructKind,
  attribute: AttributeKind,
  primaryindex: PrimaryIndexKind,
  plainindex: PlainIndexKind,
  uniqueindex: UniqueIndexKind,
  textindex: TextIndexKind,
  spatialindex: SpatialIndexKind,
  server: ServerKind,
  preamble: PreambleKind,
  postamble: PostambleKind,
  foreignkeyconstraint: ForeignKeyConstraintKind,
  datatype: DataTypeKind,
  entry: EntryKind,
  characterset: CharacterSetKind,
  collation: CollationKind,
};

export default kinds;
