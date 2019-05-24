"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsoleLogger {
    constructor() {
        this.DEBUG_ICON = '(?) DEBUG';
        this.INFO_ICON = '(i) INFO';
        this.WARN_ICON = '<!> WARN';
        this.ERROR_ICON = '[X] ERROR';
    }
    debug(path, event) {
        // eslint-disable-next-line no-console
        if (console)
            console.debug(`${this.DEBUG_ICON} ${path.join('.')}: ${event}`);
    }
    info(path, event) {
        // eslint-disable-next-line no-console
        if (console)
            console.info(`${this.INFO_ICON} ${path.join('.')}: ${event}`);
    }
    warn(path, event) {
        // eslint-disable-next-line no-console
        if (console)
            console.warn(`${this.WARN_ICON} ${path.join('.')}: ${event}`);
    }
    error(path, event) {
        // eslint-disable-next-line no-console
        if (console)
            console.error(`${this.ERROR_ICON} ${path.join('.')}: ${event}`);
    }
}
exports.default = new ConsoleLogger();
