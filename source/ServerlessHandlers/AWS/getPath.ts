import { Handler, Context, Callback } from "aws-lambda";
import getPath from "../../Commands/getPath";

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
    callback(null, { path: await getPath(body) });
};

export default handler;
