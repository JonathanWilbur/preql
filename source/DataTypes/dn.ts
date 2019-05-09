import { DataType } from "../DataType";
import { Logger } from "../Logger";

// https://stackoverflow.com/questions/20360360/how-long-maximum-characters-is-an-ldap-distinguished-name
export
const dn : DataType = {
    mariadb: {
        equivalentNativeType: (path : [ string, string, string ], spec : any, logger : Logger) : string => {
            return "VARCHAR(256)";
        },
        checkConstraints: (path : [ string, string, string ], spec : any, logger : Logger) : string[] => {
            return [
                `${path[2]} RLIKE '^\\X=\\X(?:(\\,|;)\\X=\\X)*$'`
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