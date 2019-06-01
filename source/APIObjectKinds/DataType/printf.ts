import APIObject from '../../Interfaces/APIObject';
import AttributeSpec from '../Attribute/spec';

export default
function printf(template: string, attribute: APIObject<AttributeSpec>): string {
  const lengthBits: number = (attribute.spec.length || 0); // %l
  const lengthBytes: number = Math.ceil((attribute.spec.length || 0) / 8); // %L
  const maximumBytes: number = (2 ** lengthBits); // %B
  const maximumBits: number = (maximumBytes * 8); // %b
  // const name: string = attribute.spec.name; // %a or %n
  const struct: string = attribute.spec.structName; // %s
  const entity: string = attribute.spec.entityName || ''; // %e
  const database: string = attribute.spec.databaseName; // %D
  return template
    .replace(/%l/g, lengthBits.toString())
    .replace(/%L/g, lengthBytes.toString())
    .replace(/%B/g, maximumBytes.toString())
    .replace(/%b/g, maximumBits.toString())
    .replace(/%a/g, attribute.spec.name.toString())
    .replace(/%n/g, attribute.spec.name.toString())
    .replace(/%s/g, struct.toString())
    .replace(/%e/g, entity.toString())
    .replace(/%D/g, database.toString());
};
