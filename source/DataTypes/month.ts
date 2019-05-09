import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const month : DataType = {
    mariadb: {
        equivalentNativeType: (path : [ string, string, string ], spec : any, logger : Logger) : string => {
            return "TINYINT UNSIGNED";
        },
        checkConstraints: (path : [ string, string, string ], spec : any, logger : Logger) : string[] => {
            return [
                `${path[2]} > 0 AND ${path[2]} <= 12`
            ];
        }
    }
};