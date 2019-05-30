import DatabaseKind from './Database/kind';
import EntityKind from './Entity/kind';
import StructKind from './Struct/kind';
import AttributeKind from './Attribute/kind';
import PrimaryIndex from './PrimaryIndex/kind';
import APIObjectKind from '../APIObjectKind';

export default new Map<string, APIObjectKind>([
  ['database', DatabaseKind],
  ['entity', EntityKind],
  ['struct', StructKind],
  ['attribute', AttributeKind],
  ['primaryindex', PrimaryIndex],
]);
