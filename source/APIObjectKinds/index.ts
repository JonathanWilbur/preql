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
import APIObjectKind from '../APIObjectKind';

export default new Map<string, APIObjectKind>([
  ['database', DatabaseKind],
  ['entity', EntityKind],
  ['struct', StructKind],
  ['attribute', AttributeKind],
  ['primaryindex', PrimaryIndexKind],
  ['plainindex', PlainIndexKind],
  ['uniqueindex', UniqueIndexKind],
  ['textindex', TextIndexKind],
  ['spatialindex', SpatialIndexKind],
  ['server', ServerKind],
  ['preamble', PreambleKind],
  ['postamble', PostambleKind],
]);
