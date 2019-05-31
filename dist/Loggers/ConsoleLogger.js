"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsoleLogger {
    constructor() {
        this.DEBUG_ICON = '(?) DEBUG';
        this.INFO_ICON = '(i) INFO';
        this.WARN_ICON = '<!> WARN';
        this.ERROR_ICON = '[X] ERROR';
    }
    debug(event) {
        // eslint-disable-next-line no-console
        if (console)
            console.debug(`${this.DEBUG_ICON}: ${event}`);
    }
    info(event) {
        // eslint-disable-next-line no-console
        if (console)
            console.info(`${this.INFO_ICON}: ${event}`);
    }
    warn(event) {
        // eslint-disable-next-line no-console
        if (console)
            console.warn(`${this.WARN_ICON}: ${event}`);
    }
    error(event) {
        // eslint-disable-next-line no-console
        if (console)
            console.error(`${this.ERROR_ICON}: ${event}`);
    }
}
exports.default = new ConsoleLogger();
