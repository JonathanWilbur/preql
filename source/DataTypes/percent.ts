import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const percent : DataType = {
    mariadb: {
        equivalentNativeType: (path : [ string, string, string ], spec : any, logger : Logger) : string => {
            return "DOUBLE UNSIGNED";
        },
        checkConstraints: (path : [ string, string, string ], spec : any, logger : Logger) : string[] => {
            return [
                `${path[0]} <= 100.00000000`
            ];
        }
    }
};