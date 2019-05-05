import { Logger } from "../Logger";

export
class ConsoleLogger implements Logger {
    private static DEBUG_ICON : string = "(?) DEBUG";
    private static INFO_ICON : string =  "(i) INFO";
    private static WARN_ICON : string =  "<!> WARN";
    private static ERROR_ICON : string = "[X] ERROR";
    public debug (path : string[], event : string) : void {
        if (console) console.debug(`${ConsoleLogger.DEBUG_ICON} ${path.join(".")}: ${event}`);
    }
    public info (path : string[], event : string) : void {
        if (console) console.info(`${ConsoleLogger.INFO_ICON} ${path.join(".")}: ${event}`);
    }
    public warn (path : string[], event : string) : void {
        if (console) console.warn(`${ConsoleLogger.WARN_ICON} ${path.join(".")}: ${event}`);
    }
    public error (path : string[], event : string) : void {
        if (console) console.error(`${ConsoleLogger.ERROR_ICON} ${path.join(".")}: ${event}`);
    }
}