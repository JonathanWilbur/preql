import APIObject from '../Interfaces/APIObject';
/**
 * Resolves a boolean indicating whether the `spec` field has been validated.
 * A resolution of `false` means that just the header was validated, but it was
 * valid. Rejects if any part of the object is invalid.
 *
 * @param apiObject The object to be structurally validated.
 */
export default function validateStructure(apiObject: APIObject): Promise<boolean>;