export default
interface Spec {
  protocol: string;
  hostname: string;
  port?: number;
  defaultDatabase?: string;
  tlsSupported?: boolean;
  starttlsSupported?: boolean;
  options?: { [name: string]: string };
};
