"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The main `Error` type for the PreQL library. This is typically thrown when
 * an object fails structural or semantic validation, such as when an
 * unexpected field is encountered on an object, or when an `Attribute` refers
 * to a `Struct` that does not exist.
 * @param uuid {string} A lowercased UUID for uniquely identifying the source of the error.
 * @param message {string} The message describing the error.
 */
class PreqlError extends Error {
    constructor(uuid, message) {
        super(message);
        this.uuid = uuid;
        this.message = message;
        this.relevantObjects = [];
    }
}
exports.default = PreqlError;
//# sourceMappingURL=PreqlError.js.map