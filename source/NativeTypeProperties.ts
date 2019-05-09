import { Logger } from "./Logger";

export
interface NativeTypeProperties {
    equivalentNativeType (path : [ string, string, string ], spec : any, logger : Logger) : string;
    checkConstraints (path : [ string, string, string ], spec : any, logger : Logger) : string[];
    getters : (path : [ string, string, string ], spec : any, logger : Logger) => { [ name : string ] : string };
    setters : (path : [ string, string, string ], spec : any, logger : Logger) => { [ name : string ] : string };
}