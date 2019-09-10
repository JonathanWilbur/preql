import { Callback, Context, Handler } from "aws-lambda";
import indexObjects from "../../Commands/indexObjects";
import normalizeError from "../../normalizeError";

/**
 * @see /source/Commands/indexObjects.
 */
const handler: Handler = async (event, context: Context, callback: Callback): Promise<undefined> => {
    if (!(typeof event === "object")) {
        callback(new Error("Event was not of an object type."));
        return;
    }
    const body = ((): any | undefined => {
        if (event.body) return JSON.parse(event.body); // AWS HTTP Request
        if (event.objects && Array.isArray(event.objects)) return event; // Lambda Call
        return undefined;
    })();
    if (!body) {
        callback(new Error("Event was not a recognizable type."));
        return;
    }
    if (body.objects.length === 0) {
        callback(null, {});
        return;
    }
    try {
        const namespaces = await indexObjects(body.objects);
        // See: https://stackoverflow.com/questions/44740423/create-json-string-from-js-map-and-string
        callback(null, {
            namespaces,
            numberOfObjects: body.objects.length,
        });
    } catch (e) {
        callback(normalizeError(e));
    }
};

export default handler;
