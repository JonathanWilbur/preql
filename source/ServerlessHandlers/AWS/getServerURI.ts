import { Handler, Context, Callback } from "aws-lambda";
import getServerURI from "../../Commands/getServerURI";
import normalizeError from "../../normalizeError";

const handler: Handler = async (event, context: Context, callback: Callback): Promise<undefined> => {
    if (!(typeof event === "object")) {
        callback(new Error("Event was not of an object type."));
        return;
    }
    const body = ((): any | undefined => {
        if (event.body) return JSON.parse(event.body); // AWS HTTP Request
        if (event.apiObject) return event; // Lambda Call
        return undefined;
    })();
    if (!body) {
        callback(new Error("Event was not a recognizable type."));
        return;
    }
    try {
        callback(null, getServerURI(body.apiObject));
    } catch (e) {
        callback(normalizeError(e));
    }
};

export default handler;
