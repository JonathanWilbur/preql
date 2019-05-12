import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const fqdn: DataType = {
    mariadb: {
        equivalentNativeType: (path: [ string, string, string ], spec: any, logger: Logger): string => {
            return "VARCHAR(253)";
        },
        checkConstraints: (path: [ string, string, string ], spec: any, logger: Logger): string[] => {
            return [
                `${path[2]} RLIKE '^[\\p{L}\\p{N}](?:[\\p{L}\\p{N}\-_\.]{0,251}[\\p{L}\\p{N}])?$'`,
                `LENGTH(${path[2]}) <= 253`
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