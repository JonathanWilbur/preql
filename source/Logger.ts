export default
interface Logger {
  debug (path: string[], event: string): void;
  info (path: string[], event: string): void;
  warn (path: string[], event: string): void;
  error (path: string[], event: string): void;
};
