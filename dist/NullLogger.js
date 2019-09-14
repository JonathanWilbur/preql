"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A default "logger" that does not actually do anything with events passed to
 * it. This should not be used in production.
 */
const nullLogger = {
    debug: () => { },
    info: () => { },
    warn: () => { },
    error: () => { },
};
exports.default = nullLogger;
//# sourceMappingURL=NullLogger.js.map