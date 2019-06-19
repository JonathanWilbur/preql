import APIObject from '../../Interfaces/APIObject';
import Spec from './spec';
import AttributeSpec from '../Attribute/spec';
declare const transpile: (target: string, dataType: APIObject<Spec>, attribute: APIObject<AttributeSpec>) => string;
export default transpile;
