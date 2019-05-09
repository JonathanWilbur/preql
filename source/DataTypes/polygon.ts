import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const polygon : DataType = {
    mariadb: {
        equivalentNativeType: (path : [ string, string, string ], spec : any, logger : Logger) : string => {
            return "POLYGON";
        },
        checkConstraints: (path : [ string, string, string ], spec : any, logger : Logger) : string[] => {
            return [];
        },
        getters: (path : [ string, string, string ], spec : any, logger : Logger) : { [ name : string ] : string } => {
            return {};
        },
        setters: (path : [ string, string, string ], spec : any, logger : Logger) : { [ name : string ] : string } => {
            return {};
        }
    }
};