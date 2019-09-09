import { Callback, Context, Handler } from "aws-lambda";
import ajv from "../../ajv";
import schema from "../../APIObjectKinds/Server/schema";
import getServerURI from "../../Commands/getServerURI";
import normalizeError from "../../normalizeError";
import PreqlError from "../../PreqlError";

const structureValidator = ajv.compile(schema);

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
        await structureValidator(body.apiObject.spec);
    } catch (e) {
        throw new PreqlError(
            "87e35ffb-4a27-467b-91df-1f1201638484",
            `${body.apiObject.kind} '${body.apiObject.metadata.name}' failed structural `
            + `validation. ${e.message} ${(e.errors || []).map((x: any): string => x.message).join("; ")}`,
        );
    }
    try {
        callback(null, await getServerURI(body.apiObject));
    } catch (e) {
        callback(normalizeError(e));
    }
};

export default handler;
