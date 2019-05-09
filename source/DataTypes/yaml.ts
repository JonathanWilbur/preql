import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const yaml : DataType = {
    mariadb: {
        equivalentNativeType: (path : [ string, string, string ], spec : any, logger : Logger) : string => {
            return "LONGTEXT";
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