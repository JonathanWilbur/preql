import DatabaseKind from './Database/kind';
import EntityKind from './Entity/kind';
import StructKind from './Struct/kind';
import AttributeKind from './Attribute/kind';
import PlainIndexKind from './PlainIndex/kind';
import UniqueIndexKind from './UniqueIndex/kind';
import TextIndexKind from './TextIndex/kind';
import SpatialIndexKind from './SpatialIndex/kind';
import ServerKind from './Server/kind';
import PreambleKind from './Preamble/kind';
import PostambleKind from './Postamble/kind';
import DataTypeKind from './DataType/kind';
import EntryKind from './Entry/kind';
import CharacterSetKind from './CharacterSet/kind';
import CollationKind from './Collation/kind';
import ForeignKeyKind from './ForeignKey/kind';
import EnumKind from './Enum/kind';
import APIObjectKind from '../Interfaces/APIObjectKind';

const kinds: Record<string, APIObjectKind> = {
  database: DatabaseKind,
  entity: EntityKind,
  struct: StructKind,
  attribute: AttributeKind,
  plainindex: PlainIndexKind,
  uniqueindex: UniqueIndexKind,
  textindex: TextIndexKind,
  spatialindex: SpatialIndexKind,
  server: ServerKind,
  preamble: PreambleKind,
  postamble: PostambleKind,
  foreignkey: ForeignKeyKind,
  datatype: DataTypeKind,
  entry: EntryKind,
  characterset: CharacterSetKind,
  collation: CollationKind,
  enum: EnumKind,
};

export default kinds;
