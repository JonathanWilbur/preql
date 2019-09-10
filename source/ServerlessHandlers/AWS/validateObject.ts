import { Callback, Context, Handler } from "aws-lambda";
import validateObject from "../../Commands/validateObject";
import normalizeError from "../../normalizeError";

/**
 * @see /source/Commands/validateObject.
 */
const handler: Handler = async (event, context: Context, callback: Callback): Promise<undefined> => {
    if (!(typeof event === "object")) {
        callback(new Error("Event was not of an object type."));
        return;
    }
    const body = ((): any | undefined => {
        if (event.body) return JSON.parse(event.body); // AWS HTTP Request
        if (event.apiVersion && event.kind) return event; // Lambda Call
        return undefined;
    })();
    if (!body) {
        callback(new Error("Event was not a recognizable type."));
        return;
    }
    try {
        callback(null, {
            valid: true,
            specValidated: await validateObject(body),
            validatedObject: body,
        });
    } catch (e) {
        callback(normalizeError(e));
    }
};

export default handler;
