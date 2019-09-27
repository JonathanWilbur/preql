/**
 * The spec` section of a PreQL `Server`.
 *
 * @see /source/APIObjectKinds/Server/kind.
 */
export default interface Spec {
    /**
     * The name of the server.
     */
    name: string;
    /**
     * The lower-cased identifier of the protocol used for this DBMS, as would
     * appear in a URL for that DBMS.
     */
    protocol: string;
    /**
     * The DNS hostname of the server.
     */
    hostname: string;
    /**
     * The port number (usually TCP, but it could be UDP) for accessing the DBMS.
     */
    port?: number;
    /**
     * Whether the server supports TLS.
     */
    tlsSupported?: boolean;
    /**
     * Whether the server uses STARTTLS or a similar technology.
     */
    starttlsSupported?: boolean;
    /**
     * The character set of the server.
     */
    characterSet?: string;
    /**
     * The collation of the server.
     *
     * @see /source/APIObjectKinds/Collation/kind
     */
    collation?: string;
    /**
     * Locale information.
     */
    locale?: {
        /**
         * The format of dates and times in this server.
         */
        dateAndTimeFormat?: {
            country: string;
            language: string;
        };
        /**
         * The language used by this server.
         */
        language?: {
            country: string;
            language: string;
        };
        /**
         * The monetary format used by this server.
         */
        monetaryFormat?: {
            country: string;
            language: string;
        };
        /**
         * The number format used by this server.
         */
        numberFormat?: {
            country: string;
            language: string;
        };
    };
    /**
     * The IANA TZ Database timezone used by this server.
     *
     * @see https://www.iana.org/time-zones.
     */
    timezone?: string;
    /**
     * A map of arbitrary key-value pairs for storing additional configuration
     * parameters for a server.
     */
    options?: {
        [name: string]: number | string;
    };
}
//# sourceMappingURL=spec.d.ts.map