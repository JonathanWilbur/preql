export default class PreqlError extends Error {
    readonly uuid: string;
    readonly message: string;
    relevantObjects: object[];
    constructor(uuid: string, message: string);
}
