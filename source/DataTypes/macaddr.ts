import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const macaddr : DataType = {
    mariadb: {
        equivalentNativeType: (path : [ string, string, string ], spec : any, logger : Logger) : string => {
            return "BINARY(6)";
        },
        checkConstraints: (path : [ string, string, string ], spec : any, logger : Logger) : string[] => {
            return [
            ];
        }
    }
};