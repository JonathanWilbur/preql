import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const iri : DataType = {
    mariadb: {
        equivalentNativeType: (path : [ string, string, string ], spec : any, logger : Logger) : string => {
            return "TEXT";
        },
        checkConstraints: (path : [ string, string, string ], spec : any, logger : Logger) : string[] => {
            return [
                `${path[2]} RLIKE '^[A-Za-z][A-Za-z0-9\+\.\-]+:\W+$'`
            ];
        }
    }
};