import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const geometry : DataType = {
    mariadb: {
        equivalentNativeType: (path : [ string, string, string ], spec : any, logger : Logger) : string => {
            return "GEOMETRY";
        },
        checkConstraints: (path : [ string, string, string ], spec : any, logger : Logger) : string[] => {
            return [];
        }
    }
};