import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const varchar: DataType = {
    mariadb: {
        equivalentNativeType: (path: [ string, string, string ], spec: any, logger: Logger): string => {
            // TODO: Check for spec.length.
            return `VARCHAR(${spec.length})`;
        },
        checkConstraints: (path: [ string, string, string ], spec: any, logger: Logger): string[] => {
            return [
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