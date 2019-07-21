import APIObject from '../../Interfaces/APIObject';
import Spec from './spec';
import AttributeSpec from '../Attribute/spec';
export default function transpileDataType(target: string, dataType: APIObject<Spec>, attribute: APIObject<AttributeSpec>): string;
