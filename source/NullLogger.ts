import Logger from "./Interfaces/Logger";

const nullLogger: Logger = {
    debug: (): void => {},
    info: (): void => {},
    warn: (): void => {},
    error: (): void => {},
};

export default nullLogger;
