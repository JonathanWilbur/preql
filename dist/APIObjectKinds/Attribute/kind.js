"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const matchingResource_1 = __importDefault(require("../matchingResource"));
const transpile_1 = __importDefault(require("../DataType/transpile"));
const printf_1 = __importDefault(require("../DataType/printf"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const structureValidator = ajv.compile(schema_1.default);
const kind = {
    name: 'Attribute',
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async (apiObject, etcd) => {
        if (!matchingResource_1.default(apiObject.spec.databaseName, 'database', etcd)) {
            throw new Error(`No databases found that are named '${apiObject.spec.databaseName}' for attribute `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (!matchingResource_1.default(apiObject.spec.structName, 'struct', etcd)) {
            throw new Error(`No structs found that are named '${apiObject.spec.structName}' for attribute `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
    },
    transpilePresenceIn: new Map([
        [
            'mariadb',
            (apiObject, etcd) => {
                const datatypes = etcd.kindIndex.get('datatype') || [];
                if (datatypes.length === 0) {
                    throw new Error('No data types defined.');
                }
                let columnString = `ALTER TABLE ${apiObject.spec.databaseName}.${apiObject.spec.structName}\r\n`
                    + `ADD COLUMN IF NOT EXISTS ${apiObject.spec.name} `;
                const type = apiObject.spec.type.toLowerCase();
                const matchingTypes = datatypes
                    .filter((datatype) => datatype.metadata.name.toLowerCase() === type);
                if (matchingTypes.length !== 1) {
                    throw new Error(`Data type '${type}' not recognized.`);
                }
                const datatype = matchingTypes[0];
                columnString += transpile_1.default('mariadb', datatype, apiObject);
                if (apiObject.spec.nullable)
                    columnString += ' NULL';
                else
                    columnString += ' NOT NULL';
                // Simply quoting the default value is fine, because MariaDB will cast it.
                if (apiObject.spec.default)
                    columnString += ` DEFAULT '${apiObject.spec.default}'`;
                if (apiObject.metadata.annotations && apiObject.metadata.annotations.has('comment')) {
                    columnString += `\r\nCOMMENT '${apiObject.metadata.annotations.get('comment')}'`;
                }
                columnString += ';';
                if (datatype.spec.targets.mariadb) {
                    if (datatype.spec.targets.mariadb.check) {
                        columnString += '\r\n\r\n';
                        columnString += datatype.spec.targets.mariadb.check
                            .map((expression, index) => {
                            const qualifiedTableName = `${apiObject.spec.databaseName}.${apiObject.spec.structName}`;
                            return `ALTER TABLE ${qualifiedTableName}\r\n`
                                + `DROP CONSTRAINT IF EXISTS preql_valid_${datatype.metadata.name}_${index};\r\n`
                                + `ALTER TABLE ${qualifiedTableName}\r\n`
                                + `ADD CONSTRAINT IF NOT EXISTS preql_valid_${datatype.metadata.name}_${index}\r\n`
                                + `CHECK (${printf_1.default(expression, apiObject)});`;
                        })
                            .join('\r\n\r\n');
                    }
                    // if (datatype.spec.regexes && datatype.spec.regexes.pcre && datatype.spec.regexes.pcre) {
                    //   columnString += '\r\n\r\n';
                    //   columnString += Object.entries(datatype.spec.regexes.pcre)
                    //     .map((group: [ string, { pattern: string; positive: boolean; }[] ], index: number): string => {
                    //       const qualifiedTableName: string = `${apiObject.spec.databaseName}.${apiObject.spec.structName}`;
                    //       return `ALTER TABLE ${qualifiedTableName}\r\n`
                    //       + `DROP CONSTRAINT IF EXISTS preql_valid_${datatype.metadata.name}_${index};\r\n`
                    //       + `ALTER TABLE ${qualifiedTableName}\r\n`
                    //       + `ADD CONSTRAINT IF NOT EXISTS preql_valid_${datatype.metadata.name}_${index}\r\n`
                    //       + `CHECK (${printf(expression, apiObject)});`;
                    //     })
                    //     .join('\r\n\r\n');
                    // }
                    if (datatype.spec.targets.mariadb.setters) {
                        columnString += '\r\n\r\n';
                        columnString += datatype.spec.targets.mariadb.setters
                            .map((expression, index) => {
                            const qualifiedTableName = `${apiObject.spec.databaseName}.${apiObject.spec.structName}`;
                            const formattedExpression = printf_1.default(expression, apiObject);
                            const triggerBaseName = `${apiObject.spec.databaseName}.preql_${datatype.metadata.name}_${index}`;
                            return (`DROP TRIGGER IF EXISTS ${triggerBaseName}_insert;\r\n`
                                + `CREATE TRIGGER IF NOT EXISTS ${triggerBaseName}_insert\r\n`
                                + `BEFORE INSERT ON ${qualifiedTableName} FOR EACH ROW\r\n`
                                + `SET NEW.${apiObject.spec.name} = ${formattedExpression};\r\n`
                                + '\r\n'
                                + `DROP TRIGGER IF EXISTS ${triggerBaseName}_update;\r\n`
                                + `CREATE TRIGGER IF NOT EXISTS ${triggerBaseName}_update\r\n`
                                + `BEFORE UPDATE ON ${qualifiedTableName} FOR EACH ROW\r\n`
                                + `SET NEW.${apiObject.spec.name} = ${formattedExpression};`);
                        })
                            .join('\r\n\r\n');
                    }
                }
                return columnString;
            },
        ],
    ]),
    transpileAbsenceIn: new Map([
        [
            'mariadb',
            // REVIEW: Do I need to delete triggers and check constraints, here?
            (apiObject) => 'ALTER TABLE '
                + `${apiObject.spec.databaseName}.${apiObject.spec.structName}\r\n`
                + `DROP COLUMN IF EXISTS ${apiObject.spec.name};`,
        ],
    ]),
};
exports.default = kind;
