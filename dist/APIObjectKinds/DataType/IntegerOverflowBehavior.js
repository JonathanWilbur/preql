"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Behaviors that numeric data types can exude when they exceed their
 * maximum or minimum possible values.
 */
var IntegerOverflowBehavior;
(function (IntegerOverflowBehavior) {
    IntegerOverflowBehavior["ZERO"] = "ZERO";
    IntegerOverflowBehavior["MIN"] = "MIN";
    IntegerOverflowBehavior["MAX"] = "MAX";
    IntegerOverflowBehavior["IGNORE"] = "IGNORE";
    IntegerOverflowBehavior["ERROR"] = "ERROR";
})(IntegerOverflowBehavior || (IntegerOverflowBehavior = {}));
exports.default = IntegerOverflowBehavior;
//# sourceMappingURL=IntegerOverflowBehavior.js.map