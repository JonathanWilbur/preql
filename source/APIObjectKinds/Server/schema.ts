import Locale from "../../JSONSchema/Locale";
import timezones from "../../timezones";

const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL Server Specification Schema",
    description: "This is not really used for anything.",
    type: "object",
    additionalProperties: false,
    properties: {
        name: {
            type: "string",
        },
        protocol: {
            // RFC 3987: scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
            type: "string",
            pattern: "^[A-Za-z][A-Za-z0-9\\+\\-\\.]*$",
        },
        hostname: {
            type: "string",
            // eslint-disable-next-line max-len
            unicodePattern: "^(?:(\\p{L}|\\p{N})(?:(\\p{L}|\\p{N}|-){0,61}(\\p{L}|\\p{N}))?\\.)*(?:(\\p{L}|\\p{N})(?:(\\p{L}|\\p{N}|-){0,61}(\\p{L}|\\p{N}))?\\.?)$",
            maxLength: 253,
        },
        port: {
            type: "number",
            minimum: 0,
            maximum: 65535,
        },
        tlsSupported: {
            type: "boolean",
        },
        starttlsSupported: {
            type: "boolean",
        },
        characterSet: {
            type: "string",
        },
        collation: {
            type: "string",
        },
        timezone: {
            type: "string",
            enum: timezones,
        },
        locale: {
            type: "object",
            properties: {
                dateAndTimeFormat: Locale,
                language: Locale,
                monetaryFormat: Locale,
                numberFormat: Locale,
            },
            required: [],
        },
        options: {
            type: "object",
            additionalProperties: {
                type: "string",
            },
        },
    },
    required: [
        "name",
        "hostname",
        "protocol",
    ],
};

export default schema;
