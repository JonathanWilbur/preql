import APIObject from "./APIObject";

/**
 * The interface for something that arranges the API objects supplied to PreQL.
 * Many other functions use the output of this, rather than a simple list of
 * objects.
 */
export default
interface APIObjectDatabase {
    readonly namespace: string;
    readonly kindIndex: Record<string, APIObject[]>;
    readonly kindNameIndex: Record<string, APIObject>;
    readonly pathIndex: Record<string, APIObject>;
    readonly objectIdentifierIndex: Record<string, APIObject>;
    readonly distinguishedNameIndex: Record<string, APIObject>;
}
