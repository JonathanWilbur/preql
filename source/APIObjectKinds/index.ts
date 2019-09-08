import APIObjectKind from "../Interfaces/APIObjectKind";
import AttributeKind from "./Attribute/kind";
import CharacterSetKind from "./CharacterSet/kind";
import CollationKind from "./Collation/kind";
import DatabaseKind from "./Database/kind";
import DataTypeKind from "./DataType/kind";
import EntityKind from "./Entity/kind";
import EntryKind from "./Entry/kind";
import ForeignKeyKind from "./ForeignKey/kind";
import PlainIndexKind from "./PlainIndex/kind";
import PostambleKind from "./Postamble/kind";
import PreambleKind from "./Preamble/kind";
import ServerKind from "./Server/kind";
import SpatialIndexKind from "./SpatialIndex/kind";
import StructKind from "./Struct/kind";
import TextIndexKind from "./TextIndex/kind";
import UniqueIndexKind from "./UniqueIndex/kind";

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
};

export default kinds;
