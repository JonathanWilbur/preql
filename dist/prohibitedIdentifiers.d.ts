/**
 * This list notably excludes non-portable attribute names that do not
 * begin with underscores (of which, there are many, such as `_id`, used by
 * MongoDB, CouchDB, and ElasticSearch), because these identifiers are
 * prohibited by the JSON schema that validates metadata names and identifiers.
 */
declare const prohibitedIdentifiers: string[];
export default prohibitedIdentifiers;
//# sourceMappingURL=prohibitedIdentifiers.d.ts.map