import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const date : DataType = {
    mariadb: {
        equivalentNativeType: (path : [ string, string, string ], spec : any, logger : Logger) : string => {
            return "DATE";
        },
        checkConstraints: (path : [ string, string, string ], spec : any, logger : Logger) : string[] => {
            return [];
        }
    }
};