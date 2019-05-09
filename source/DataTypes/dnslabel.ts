import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const dnslabel : DataType = {
    mariadb: {
        equivalentNativeType: (path : [ string, string, string ], spec : any, logger : Logger) : string => {
            return "VARCHAR(63)";
        },
        checkConstraints: (path : [ string, string, string ], spec : any, logger : Logger) : string[] => {
            return [
                `${path[2]} RLIKE '^[\\p{L}\\p{N}](?:[\\p{L}\\p{N}\-_]{0,61}[\\p{L}\\p{N}])?$'`,
                `LENGTH(${path[2]}) <= 63`
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