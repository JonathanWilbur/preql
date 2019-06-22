export default interface Attribute {
    name: string;
    structName: string;
    entityName?: string;
    databaseName: string;
    default?: string | number;
    nullable: boolean;
    type: string;
    length?: number;
    multiValued: boolean;
}
