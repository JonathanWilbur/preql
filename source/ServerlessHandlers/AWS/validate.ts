import { Callback, Context, Handler } from "aws-lambda";
import indexObjects from "../../Commands/indexObjects";
import validateNamespace from "../../Commands/validateNamespace";
import validateObject from "../../Commands/validateObject";
import normalizeError from "../../normalizeError";

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
    if (typeof body.objects !== "object" || !Array.isArray(body.objects)) {
        callback(new Error("Event was supposed to have an `objects` array."));
        return;
    }
    if (body.objects.length === 0) {
        callback(null, {
            namespaces: {},
            numberOfObjects: 0,
            valid: true,
        });
        return;
    }
    try {
        await Promise.all(body.objects.map(validateObject));
        const namespaces = await indexObjects(body.objects);
        await Promise.all(Object.values(namespaces).map(validateNamespace));
        callback(null, {
            namespaces,
            numberOfObjects: body.objects.length,
            valid: true,
        });
    } catch (e) {
        callback(normalizeError(e));
    }
};

export default handler;
