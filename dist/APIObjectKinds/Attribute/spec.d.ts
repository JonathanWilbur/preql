/**
 * The `spec` section of a PreQL `Attribute`.
 *
 * @see /source/APIObjectKinds/Attribute/kind.
 */
export default interface Attribute {
    name: string;
    pluralName?: string;
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
    matchingRules?: string[];
    orderingRules?: string[];
    substringRules?: string[];
    otherNames?: string[];
}
//# sourceMappingURL=spec.d.ts.map