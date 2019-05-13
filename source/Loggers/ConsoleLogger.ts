import Logger from '../Logger';

export default
class ConsoleLogger implements Logger {
  private DEBUG_ICON: string = '(?) DEBUG';

  private INFO_ICON: string = '(i) INFO';

  private WARN_ICON: string = '<!> WARN';

  private ERROR_ICON: string = '[X] ERROR';

  public debug(path: string[], event: string): void {
    // eslint-disable-next-line no-console
    if (console) console.debug(`${this.DEBUG_ICON} ${path.join('.')}: ${event}`);
  }

  public info(path: string[], event: string): void {
    // eslint-disable-next-line no-console
    if (console) console.info(`${this.INFO_ICON} ${path.join('.')}: ${event}`);
  }

  public warn(path: string[], event: string): void {
    // eslint-disable-next-line no-console
    if (console) console.warn(`${this.WARN_ICON} ${path.join('.')}: ${event}`);
  }

  public error(path: string[], event: string): void {
    // eslint-disable-next-line no-console
    if (console) console.error(`${this.ERROR_ICON} ${path.join('.')}: ${event}`);
  }
}
