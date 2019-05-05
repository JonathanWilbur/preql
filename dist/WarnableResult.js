"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WarnableResult {
    constructor(warnings = new Set([]), value = null) {
        this.warnings = warnings;
        this.value = value;
    }
}
exports.WarnableResult = WarnableResult;
