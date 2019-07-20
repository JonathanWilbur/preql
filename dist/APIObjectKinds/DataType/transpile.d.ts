import APIObject from '../../Interfaces/APIObject';
import Spec from './spec';
import AttributeSpec from '../Attribute/spec';
import EnumSpec from '../Enum/spec';
export default function transpileDataType(target: string, dataType: APIObject<Spec>, attribute: APIObject<AttributeSpec | EnumSpec>): string;
