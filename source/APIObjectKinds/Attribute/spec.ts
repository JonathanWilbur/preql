/**
 * The `spec` section of a PreQL `Attribute`.
 *
 * @see /source/APIObjectKinds/Attribute/kind.
 */
export default
interface Attribute {

    /**
     * The DBMS-friendly name of the object.
     */
    name: string;

    /**
     * A DBMS-friendly pluralized name of the object.
     */
    pluralName?: string;

    /**
     * The DBMS-friendly name of the `Struct` to which this `Attribute`
     * is attached.
     *
     * @see /source/APIObjectKinds/Struct/kind
     */
    structName: string;

    /**
     * The DBMS-friendly name of the `Entity` to which this `Attribute`
     * is attached.
     *
     * @see /source/APIObjectKinds/Entity/kind
     */
    entityName?: string;

    /**
     * The DBMS-friendly name of the `Database` to which this `Attribute`
     * is attached.
     *
     * @see /source/APIObjectKinds/Database/kind
     */
    databaseName: string;

    /**
     * The default value of this attribute, used if the value is not supplied.
     */
    default?: number | string;

    /**
     * Whether the `Attribute` can be excluded from an insertion.
     */
    nullable: boolean;

    /**
     * The data type of the `Attribute`. This must refer to the `metadata.name`
     * of a PreQL `DataType` within the namespace.
     */
    type: string;

    /**
     * Whether this attribute may be present multiple times in a `Struct`.
     * In LDAP databases, this does exactly what it sounds like. In relational
     * databases, this being `true` should result in a separate table with a
     * foreign key pointing to this `Attribute`'s `Struct` and with a column
     * containing the value (so that there can be many such values associated
     * with one object.)
     */
    multiValued: boolean;

    /**
     * Sometimes used for data compression, this indicates whether an
     * `Attribute` is likely to be null / absent in an entry.
     */
    sparse: boolean;

    /**
     * The DBMS-friendly name of the character set that should be used to
     * encode this `Attribute`. This should only be present when the
     * `Attribute` is of a string-like type.
     *
     * @see /source/APIObjectKinds/CharacterSet/kind
     */
    characterSet?: string;

    /**
     * The DBMS-friendly name of the collation that should be used to
     * sort this `Attribute`. This should only be present when the
     * `Attribute` is of a string-like type.
     *
     * @see /source/APIObjectKinds/Collation/kind
     */
    collation?: string;

    /**
     * The dot-delimited, numeric-only object identifier assigned to this
     * `Attribute`, which is primarily used by X.500 / LDAP directories.
     */
    objectIdentifier?: string;

    // REVIEW: Are these used anymore?
    matchingRules?: string[];
    orderingRules?: string[];
    substringRules?: string[];

    /**
     * Other names that may be used to identify this `Attribute`, which are
     * primarily used by X.500 / LDAP directories.
     */
    otherNames?: string[];

}
