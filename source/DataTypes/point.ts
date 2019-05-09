import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const point : DataType = {
    mariadb: {
        equivalentNativeType: (path : [ string, string, string ], spec : any, logger : Logger) : string => {
            return "POINT";
        },
        checkConstraints: (path : [ string, string, string ], spec : any, logger : Logger) : string[] => {
            return [];
        }
    }
};