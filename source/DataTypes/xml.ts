import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const xml: DataType = {
    mariadb: {
        equivalentNativeType: (path: [ string, string, string ], spec: any, logger: Logger): string => {
            return "LONGTEXT";
        },
        checkConstraints: (path: [ string, string, string ], spec: any, logger: Logger): string[] => {
            return []; // TODO: Add some more checks.
        },
        getters: (path: [ string, string, string ], spec: any, logger: Logger): { [ name: string ]: string } => {
            return {};
        },
        setters: (path: [ string, string, string ], spec: any, logger: Logger): { [ name: string ]: string } => {
            return {};
        }
    }
};