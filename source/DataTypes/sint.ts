import { DataType } from "../DataType";
import { Logger } from "../Logger";

export
const sint : DataType = {
    mariadb: {
        equivalentNativeType: (path : [ string, string, string ], spec : any, logger : Logger) : string => {
            const length : number = (("length" in spec) ? spec.length : 1);
            if (isNaN(length)) throw new Error("Non-numeric length received.");
            if (length < 0) throw new Error("Negative length received.");
            if (length === 0) throw new Error("Zero-length received.");
            if (length === 1) {
                logger.warn(path, "sint with a length of 1 has been transpiled to a BOOLEAN.");
                return "BOOLEAN";
            }
            if (length <=  8) return "TINYINT SIGNED";
            if (length <= 16) return "SMALLINT SIGNED";
            if (length <= 32) return "INTEGER SIGNED";
            if (length <= 64) return "BIGINT SIGNED";
            logger.warn(path, `No native signed integral type can support ${length} bits. Defaulting to BIGINT SIGNED.`);
            return "BIGINT SIGNED";
        },
        checkConstraints: (path : [ string, string, string ], spec : any, logger : Logger) : string[] => {
            const columnName : string = path[2];
            const length : number = (("length" in spec) ? spec.length : 1);
            if (isNaN(length)) throw new Error("Non-numeric length received.");
            if (length < 0) throw new Error("Negative length received.");
            if (length === 0) throw new Error("Zero-length received.");
            if ([ 1, 8, 16, 32, 64 ].includes(length)) return [];
            const max : number = (Math.pow(2, (length - 1)) - 1);
            const min : number = -(Math.pow(2, (length - 1)));
            return [ `${columnName} <= ${max} AND ${columnName} >= ${min}` ];
        },
        getters: (path : [ string, string, string ], spec : any, logger : Logger) : { [ name : string ] : string } => {
            return {};
        },
        setters: (path : [ string, string, string ], spec : any, logger : Logger) : { [ name : string ] : string } => {
            return {};
        }
    }
};