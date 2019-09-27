/**
 * The interface for a valid logger that transpilers _should_ use to log data.
 * This exists so that a "loggable" object can be dependency-injected into
 * transpiling code.
 */
export default interface Logger {
    /**
     * Log an event that is extremely detailed for use in debugging.
     *
     * @param event {string} A message that is to be logged.
     */
    debug(event: string): void;
    /**
     * Log an event that is not a cause for concern.
     *
     * @param event {string} A message that is to be logged.
     */
    info(event: string): void;
    /**
     * Log an event that indicates a potential problem.
     *
     * @param event {string} A message that is to be logged.
     */
    warn(event: string): void;
    /**
     * Log an event that indicates a problem.
     *
     * @param event {string} A message that is to be logged.
     */
    error(event: string): void;
}
//# sourceMappingURL=Logger.d.ts.map