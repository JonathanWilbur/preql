"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsoleLogger {
    debug(path, event) {
        if (console)
            console.debug(`${ConsoleLogger.DEBUG_ICON} ${path.join(".")}: ${event}`);
    }
    info(path, event) {
        if (console)
            console.info(`${ConsoleLogger.INFO_ICON} ${path.join(".")}: ${event}`);
    }
    warn(path, event) {
        if (console)
            console.warn(`${ConsoleLogger.WARN_ICON} ${path.join(".")}: ${event}`);
    }
    error(path, event) {
        if (console)
            console.error(`${ConsoleLogger.ERROR_ICON} ${path.join(".")}: ${event}`);
    }
}
ConsoleLogger.DEBUG_ICON = "(?) DEBUG";
ConsoleLogger.INFO_ICON = "(i) INFO";
ConsoleLogger.WARN_ICON = "<!> WARN";
ConsoleLogger.ERROR_ICON = "[X] ERROR";
exports.ConsoleLogger = ConsoleLogger;
