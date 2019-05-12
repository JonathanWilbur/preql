import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const sid: DataType = {
    mariadb: {
        equivalentNativeType: (path: [ string, string, string ], spec: any, logger: Logger): string => {
            return "VARCHAR(128)";
        },
        checkConstraints: (path: [ string, string, string ], spec: any, logger: Logger): string[] => {
            return [
                `${path[2]} RLIKE '^S-\d-\d+(?:-\d+)*$'`
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