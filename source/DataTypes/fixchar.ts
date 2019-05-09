import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const fixchar : DataType = {
    mariadb: {
        equivalentNativeType: (path : [ string, string, string ], spec : any, logger : Logger) : string => {
            // TODO: Check that spec.length exists.
            return `CHAR(${spec.length})`;
        },
        checkConstraints: (path : [ string, string, string ], spec : any, logger : Logger) : string[] => {
            return [
            ];
        },
        getters: (path : [ string, string, string ], spec : any, logger : Logger) : { [ name : string ] : string } => {
            return {};
        },
        setters: (path : [ string, string, string ], spec : any, logger : Logger) : { [ name : string ] : string } => {
            return {};
        }
    }
};