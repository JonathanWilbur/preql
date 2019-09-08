export default
interface Spec {
    name: string;
    protocol: string;
    hostname: string;
    port?: number;
    tlsSupported?: boolean;
    starttlsSupported?: boolean;
    characterSet?: string;
    collation?: string;
    locale?: {
        dateAndTimeFormat?: {
            country: string;
            language: string;
        };
        language?: {
            country: string;
            language: string;
        };
        monetaryFormat?: {
            country: string;
            language: string;
        };
        numberFormat?: {
            country: string;
            language: string;
        };
    };
    timezone?: string;
    options?: {
        [name: string]: number | string;
    };
}
