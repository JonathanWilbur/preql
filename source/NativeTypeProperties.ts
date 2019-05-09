import { Logger } from "./Logger";

export
interface NativeTypeProperties {
    equivalentNativeType (path : [ string, string, string ], spec : any, logger : Logger) : string;
    checkConstraints (path : [ string, string, string ], spec : any, logger : Logger) : string[];
}