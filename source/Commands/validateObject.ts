import ajv from "../ajv";
import kinds from "../APIObjectKinds";
import APIObject from "../Interfaces/APIObject";
import APIObjectKind from "../Interfaces/APIObjectKind";
import APIObjectSchema from "../JSONSchema/APIObject";
import PreqlError from "../PreqlError";
import prohibitedIdentifiers from "../prohibitedIdentifiers";

const structureValidator = ajv.compile(APIObjectSchema);

/**
 * Resolves a boolean indicating whether the `spec` field has been validated.
 * A resolution of `false` means that just the header was validated, but it was
 * valid. Rejects if any part of the object is invalid.
 *
 * @param obj {APIObject} The object to be structurally validated.
 * @returns {Promise} A promise resolving a boolean indicating whether the `spec` field was validated.
 */
export default
async function validateObject (obj: APIObject): Promise<boolean> {
    try {
    await structureValidator(obj);
    } catch (err) {
        throw new PreqlError(
            "26f92982-d600-4ef4-83c5-f9271c895303",
            `An object failed structural `
            + `validation. ${err.message} ${(err.errors || []).map((e: any): string => e.message).join("; ")}`,
        );
    }
    const kind: APIObjectKind | undefined = kinds[obj.kind.toLowerCase()];
    if (!kind) return Promise.resolve(false);
    try {
        await kind.validateStructure(obj);
    } catch (err) {
        throw new PreqlError(
            "9bf4d422-e409-4f00-99f7-ac8cd4954175",
            `${obj.kind} '${obj.metadata.name}' failed structural `
            + `validation. ${err.message} ${(err.errors || []).map((e: any): string => e.message).join("; ")}`,
        );
    }
    if (prohibitedIdentifiers.indexOf(obj.metadata.name) !== -1) {
        throw new PreqlError(
            "ed7558d6-61b8-44e5-ae73-8feaf60404de",
            `Metadata name '${obj.metadata.name}' is prohibited.`,
        );
    }
    if (obj.spec.name && (prohibitedIdentifiers.indexOf(obj.spec.name) !== -1)) {
        throw new PreqlError(
            "1d3adbad-aaaa-4601-b95b-11892bc4bed9",
            `Spec name '${obj.spec.name}' is prohibited.`,
        );
    }
    return true;
}
