"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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