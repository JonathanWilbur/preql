/**
 * The interface for a valid logger that transpilers _should_ use to log data.
 * This exists so that a "loggable" object can be dependency-injected into
 * transpiling code.
 */
export default interface Logger {
    debug(event: string): void;
    info(event: string): void;
    warn(event: string): void;
    error(event: string): void;
}
//# sourceMappingURL=Logger.d.ts.map