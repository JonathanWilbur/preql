import APIObject from '../../Interfaces/APIObject';
import AttributeSpec from '../Attribute/spec';
import EnumSpec from '../Enum/spec';
export default function printf(template: string, attribute: APIObject<AttributeSpec | EnumSpec>): string;
