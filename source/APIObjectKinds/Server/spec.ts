export default
interface Spec {
  protocol: string;
  hostname: string;
  port?: number;
  defaultDatabase?: string;
  tlsSupported?: boolean;
  starttlsSupported?: boolean;
  options?: {
    characterSet: string;
    collation: string;
    locale: string;
    timezone: number | string;
    [name: string]: number | string;
  };
};
