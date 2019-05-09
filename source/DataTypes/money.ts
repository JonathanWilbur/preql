import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const money : DataType = {
    mariadb: {
        equivalentNativeType: (path : [ string, string, string ], spec : any, logger : Logger) : string => {
            return "DECIMAL(21,2)";
        },
        checkConstraints: (path : [ string, string, string ], spec : any, logger : Logger) : string[] => {
            return [];
        }
    }
};