import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const json : DataType = {
    mariadb: {
        equivalentNativeType: (path : [ string, string, string ], spec : any, logger : Logger) : string => {
            return "LONGTEXT";
        },
        checkConstraints: (path : [ string, string, string ], spec : any, logger : Logger) : string[] => {
            return [
                `JSON_VALID(${path[2]})`
            ];
        }
    }
};