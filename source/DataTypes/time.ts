import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const time: DataType = {
    mariadb: {
        equivalentNativeType: (path: [ string, string, string ], spec: any, logger: Logger): string => {
            return "TIME";
        },
        checkConstraints: (path: [ string, string, string ], spec: any, logger: Logger): string[] => {
            return [];
        },
        getters: (path: [ string, string, string ], spec: any, logger: Logger): { [ name: string ]: string } => {
            return {};
        },
        setters: (path: [ string, string, string ], spec: any, logger: Logger): { [ name: string ]: string } => {
            return {};
        }
    }
};