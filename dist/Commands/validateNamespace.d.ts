import APIObjectDatabase from "../Interfaces/APIObjectDatabase";
/**
 * Semantically validates a namespace, which means checking that all references
 * are valid, among other things. For instance, this function checks that all
 * `Attribute`s attach to a valid `Struct`.
 *
 * @param namespace {APIObjectDatabase} The namespace to be validated.
 * @returns {Promise} A promise resolving nothing. Ignore the resolved value.
 */
export default function validateNamespace(namespace: APIObjectDatabase): Promise<void[][]>;
//# sourceMappingURL=validateNamespace.d.ts.map