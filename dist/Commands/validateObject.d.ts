import APIObject from "../Interfaces/APIObject";
/**
 * Resolves a boolean indicating whether the `spec` field has been validated.
 * A resolution of `false` means that just the header was validated, but it was
 * valid. Rejects if any part of the object is invalid.
 *
 * @param obj {APIObject} The object to be structurally validated.
 * @returns {Promise} A promise resolving a boolean indicating whether the `spec` field was validated.
 */
export default function validateObject(obj: APIObject): Promise<boolean>;
//# sourceMappingURL=validateObject.d.ts.map