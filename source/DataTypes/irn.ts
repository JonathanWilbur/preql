import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const irn: DataType = {
    mariadb: {
        equivalentNativeType: (path: [ string, string, string ], spec: any, logger: Logger): string => {
            return "TEXT";
        },
        checkConstraints: (path: [ string, string, string ], spec: any, logger: Logger): string[] => {
            return [
                `${path[2]} RLIKE '^urn:[A-Za-z0-9][A-Za-z0-9\-]{0,30}[A-Za-z0-9]:[^\w\u0000-\u001F"#<>]+$'`
            ];
        },
        getters: (path: [ string, string, string ], spec: any, logger: Logger): { [ name: string ]: string } => {
            return {};
        },
        setters: (path: [ string, string, string ], spec: any, logger: Logger): { [ name: string ]: string } => {
            return {};
        }
    }
};