import { Callback, Context, Handler } from "aws-lambda";
import getEntries from "../../Commands/getEntries";
import indexObjects from "../../Commands/indexObjects";
import validateNamespace from "../../Commands/validateNamespace";
import validateObject from "../../Commands/validateObject";
import normalizeError from "../../normalizeError";

/**
 * @see /source/Commands/getEntries.
 */
const handler: Handler = async (event, context: Context, callback: Callback): Promise<undefined> => {
    if (!(typeof event === "object")) {
        callback(new Error("Event was not of an object type."));
        return;
    }
    const body = ((): any | undefined => {
        if (event.body) return JSON.parse(event.body); // AWS HTTP Request
        if (event.objects) return event; // Lambda Call
        return undefined;
    })();
    if (!body) {
        callback(new Error("Event was not a recognizable type."));
        return;
    }
    if (body.objects.length === 0) {
        callback(null, { entries: {} });
        return;
    }
    try {
        await Promise.all(body.objects.map(validateObject));
        const namespaces = await indexObjects(body.objects);
        await Promise.all(Object.values(namespaces).map(validateNamespace));
        const entries = await getEntries(namespaces[body.namespace || "default"]);
        callback(null, entries);
    } catch (e) {
        callback(normalizeError(e));
    }
};

export default handler;
