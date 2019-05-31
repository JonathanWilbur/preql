import Logger from '../Logger';

class ConsoleLogger implements Logger {
  private DEBUG_ICON: string = '(?) DEBUG';

  private INFO_ICON: string = '(i) INFO';

  private WARN_ICON: string = '<!> WARN';

  private ERROR_ICON: string = '[X] ERROR';

  public debug(event: string): void {
    // eslint-disable-next-line no-console
    if (console) console.debug(`${this.DEBUG_ICON}: ${event}`);
  }

  public info(event: string): void {
    // eslint-disable-next-line no-console
    if (console) console.info(`${this.INFO_ICON}: ${event}`);
  }

  public warn(event: string): void {
    // eslint-disable-next-line no-console
    if (console) console.warn(`${this.WARN_ICON}: ${event}`);
  }

  public error(event: string): void {
    // eslint-disable-next-line no-console
    if (console) console.error(`${this.ERROR_ICON}: ${event}`);
  }
}

export default new ConsoleLogger();
