export default interface Attribute {
    name: string;
    structName: string;
    entityName?: string;
    databaseName: string;
    default?: number | string;
    nullable: boolean;
    type: string;
    length?: number;
    multiValued: boolean;
    characterSet?: string;
    collation?: string;
    objectIdentifier?: string;
    otherNames?: string[];
}
