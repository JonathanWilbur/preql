import Logger from "./Interfaces/Logger";

/**
 * A default "logger" that does not actually do anything with events passed to
 * it. This should not be used in production.
 */
const nullLogger: Logger = {
    debug: (): void => {},
    info: (): void => {},
    warn: (): void => {},
    error: (): void => {},
};

export default nullLogger;
