"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleLogger_1 = __importDefault(require("../../Loggers/ConsoleLogger"));
const index_1 = __importDefault(require("../../DataTypes/index"));
const index_2 = __importDefault(require("../../Schema/index"));
const mergeColumnInterfaceAndImplementation_1 = __importDefault(require("../../mergeColumnInterfaceAndImplementation"));
const logger = new ConsoleLogger_1.default();
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const validate = ajv.compile(index_2.default);
function convertPreqlTypeToNativeType(path, spec) {
    const type = spec.type.toLowerCase();
    if (type in index_1.default) {
        return index_1.default[type].mariadb.equivalentNativeType(path, spec, logger);
    }
    throw new Error(`${path}: Unrecognized type: ${type}`);
}
function transpileCheckExpressions(path, spec) {
    const type = spec.type.toLowerCase();
    if (type in index_1.default) {
        return index_1.default[type].mariadb.checkConstraints(path, spec, logger);
    }
    throw new Error(`${path}: Unrecognized type: ${type}`);
}
function transpileCheckConstraints(path, spec) {
    const tableName = path[1];
    const columnName = path[2];
    // TODO: Review constraint name size limits
    const constraintName = `check_${columnName}_is_valid_${spec.type}`;
    const constraintExpressions = transpileCheckExpressions(path, spec);
    if (constraintExpressions.length === 0)
        return '';
    return (`${`ALTER TABLE ${tableName}\r\n`
        + `DROP CONSTRAINT IF EXISTS ${constraintName};\r\n`
        + `ALTER TABLE ${tableName}\r\n`
        + `ADD CONSTRAINT IF NOT EXISTS ${constraintName}\r\n`
        + 'CHECK (\r\n\t'}${constraintExpressions.join(' AND\r\n\t')}\r\n);`);
}
function transpileTriggers(path, spec) {
    const type = spec.type.toLowerCase();
    if (type in index_1.default) {
        const setters = index_1.default[type].mariadb.setters(path, spec, logger);
        return Object.keys(setters)
            .map((key) => {
            const triggerBaseName = `${path[0]}.${path[1]}_${path[2]}_${key}`;
            return ['INSERT', 'UPDATE'].map((event) => {
                const triggerName = `${triggerBaseName}_${event.toLowerCase()}`;
                return (`DROP TRIGGER IF EXISTS ${triggerName};\r\n`
                    + `CREATE TRIGGER IF NOT EXISTS ${triggerName}\r\n`
                    + `BEFORE ${event} ON ${path[0]}.${path[1]} FOR EACH ROW\r\n`
                    + `SET NEW.${path[2]} = ${setters[key]};`);
            }).join('\r\n\r\n');
        });
    }
    throw new Error(`${path}: Unrecognized type: ${type}`);
}
function transpileColumn(path, spec) {
    const tableName = path[1];
    const columnName = path[2];
    let columnString = `ALTER TABLE ${tableName}\r\nADD COLUMN IF NOT EXISTS ${columnName} `;
    columnString += convertPreqlTypeToNativeType(path, spec);
    if (spec.nullable)
        columnString += ' NULL';
    else
        columnString += ' NOT NULL';
    // Simply quoting the default value is fine, because MySQL will cast it.
    if (spec.default)
        columnString += ` DEFAULT '${spec.default}'`;
    if ('comment' in spec && spec.comment !== '')
        columnString += `\r\nCOMMENT '${spec.comment}'`;
    columnString += ';';
    logger.debug(path, 'Transpiled.');
    return columnString;
}
function transpileIndex(path, spec) {
    const indexName = path[2];
    const storedProcedureName = `create_index_${indexName}`;
    const indexType = spec.type.toLowerCase();
    const columnString = spec.keys
        .map((key) => `${key.column} ${(key.ascending ? 'ASC' : 'DESC')}`)
        .join(', ');
    switch (indexType) {
        case ('plain'): {
            return (`ALTER TABLE ${path[0]}.${path[1]}\r\n`
                + `ADD INDEX IF NOT EXISTS ${indexName}\r\n`
                + `PRIMARY KEY (${columnString});`);
        }
        case ('primary'): {
            const duplicateErrorCode = 1068;
            return (`DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
                + 'DELIMITER $$\r\n'
                + `CREATE PROCEDURE IF NOT EXISTS ${storedProcedureName} ()\r\n`
                + 'BEGIN\r\n'
                + `\tDECLARE EXIT HANDLER FOR ${duplicateErrorCode} DO 0;\r\n`
                + `\tALTER TABLE ${path[0]}.${path[1]}\r\n`
                + `\tADD CONSTRAINT ${indexName} PRIMARY KEY (${columnString});\r\n`
                + 'END $$\r\n'
                + 'DELIMITER ;\r\n'
                + `CALL ${storedProcedureName};\r\n`
                + `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`);
        }
        case ('unique'): {
            const duplicateErrorCode = 1061;
            return (`DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
                + 'DELIMITER $$\r\n'
                + `CREATE PROCEDURE IF NOT EXISTS ${storedProcedureName} ()\r\n`
                + 'BEGIN\r\n'
                + `\tDECLARE EXIT HANDLER FOR ${duplicateErrorCode} DO 0;\r\n`
                + `\tALTER TABLE ${path[0]}.${path[1]}\r\n`
                + `\tADD CONSTRAINT ${indexName} UNIQUE KEY (${columnString});\r\n`
                + 'END $$\r\n'
                + 'DELIMITER ;\r\n'
                + `CALL ${storedProcedureName};\r\n`
                + `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`);
        }
        case ('text'): {
            const duplicateErrorCode = 1061;
            return (`DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
                + 'DELIMITER $$\r\n'
                + `CREATE PROCEDURE IF NOT EXISTS ${storedProcedureName} ()\r\n`
                + 'BEGIN\r\n'
                + `\tDECLARE EXIT HANDLER FOR ${duplicateErrorCode} DO 0;\r\n`
                + `\tALTER TABLE ${path[0]}.${path[1]}\r\n`
                + `\tADD FULLTEXT INDEX (${columnString});\r\n`
                + 'END $$\r\n'
                + 'DELIMITER ;\r\n'
                + `CALL ${storedProcedureName};\r\n`
                + `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`);
        }
        case ('spatial'): {
            const duplicateErrorCode = 1061;
            return (`DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
                + 'DELIMITER $$\r\n'
                + `CREATE PROCEDURE IF NOT EXISTS ${storedProcedureName} ()\r\n`
                + 'BEGIN\r\n'
                + `\tDECLARE EXIT HANDLER FOR ${duplicateErrorCode} DO 0;\r\n`
                + `\tALTER TABLE ${path[0]}.${path[1]}\r\n`
                + `\tADD SPATIAL INDEX (${columnString});\r\n`
                + 'END $$\r\n'
                + 'DELIMITER ;\r\n'
                + `CALL ${storedProcedureName};\r\n`
                + `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`);
        }
        default:
            throw new Error(`${path.join('.')}: Index ${indexName} had unrecognized type '${indexType}'.`
                + 'This error should never have appeared, because index types should have been'
                + 'validated by schema validation.');
    }
}
function transpileTable(path, spec) {
    const schemaName = path[0];
    const tableName = path[1];
    if (!('columns' in spec)) {
        throw new Error('Table must have columns specification.');
    }
    const columnStrings = [];
    const checkConstraintStrings = [];
    const triggerStrings = [];
    const indexStrings = [];
    Object.keys(spec.columns).forEach((columnName) => {
        const columnSpec = spec.columns[columnName];
        const columnPath = [schemaName, tableName, columnName];
        const column = transpileColumn(columnPath, columnSpec);
        const checkConstraint = transpileCheckConstraints(columnPath, columnSpec);
        const triggers = transpileTriggers(columnPath, columnSpec);
        columnStrings.push(column);
        if (checkConstraint.length !== 0)
            checkConstraintStrings.push(checkConstraint); // REVIEW: Code smell
        Array.prototype.push.apply(triggerStrings, triggers);
    });
    if (spec.indexes) {
        Object.keys(spec.indexes).forEach((indexName) => {
            if (!spec.indexes) {
                throw new Error('spec.indexes was falsy.');
            }
            if (!(indexName in spec.indexes)) {
                throw new Error(`Index '${indexName}' not in spec.indexes.`);
            }
            const indexSpec = spec.indexes[indexName];
            const indexPath = [schemaName, tableName, indexName];
            const index = transpileIndex(indexPath, indexSpec);
            indexStrings.push(index);
        });
    }
    logger.info(path, 'Transpiled.');
    return (`CREATE TABLE IF NOT EXISTS ${tableName} (__placeholder__ BOOLEAN);\r\n\r\n`
        + `${columnStrings.join('\r\n\r\n')}\r\n\r\n`
        + `ALTER TABLE ${tableName} DROP COLUMN IF EXISTS __placeholder__;\r\n\r\n`
        + `${checkConstraintStrings.concat(triggerStrings, indexStrings).join('\r\n\r\n')}`);
}
function transpileSchema(path, spec) {
    let result = '';
    if (spec.tables) {
        Object.keys(spec.tables).forEach((tableName) => {
            if (!spec.tables) {
                throw new Error('spec.tables was falsy.');
            }
            result += transpileTable([path[0], tableName], spec.tables[tableName]);
        });
    }
    logger.info(path, 'Transpiled.');
    return result;
}
function main(spec, callback) {
    const result = {
        value: '',
    };
    if (spec.schema) {
        Object.entries(spec.schema).forEach((schema) => {
            const [schemaName, schemaSpec] = schema;
            // Joining the interfaces to schema.
            if (schemaSpec.tables
                && spec.interfaces
                && Object.keys(schemaSpec.tables).length > 0
                && Object.keys(spec.interfaces).length > 0) {
                Object.entries(schemaSpec.tables).forEach((table) => {
                    const [tableName, tableSpec] = table;
                    if (!(tableSpec.implements))
                        return;
                    if (tableSpec.implements.length === 0)
                        return;
                    tableSpec.implements.forEach((implementation) => {
                        if (!spec.interfaces)
                            return;
                        if (!(implementation in spec.interfaces)) {
                            throw new Error(`Interface '${implementation}' not recognized.`);
                        }
                        Object.entries(spec.interfaces[implementation])
                            .forEach((implementationColumn) => {
                            const [columnName, columnSpec] = implementationColumn;
                            const path = [schemaName, tableName, columnName];
                            if (columnName in tableSpec.columns) { // Merge conflict
                                logger.debug(path, `Merging column '${columnName}' for the implementation of interface '${implementation}'.`);
                                mergeColumnInterfaceAndImplementation_1.default(implementation, path, columnSpec, tableSpec.columns[columnName]);
                            }
                            else { // No merge conflict
                                logger.debug(path, `Creating column '${columnName}' for the implementation of interface '${implementation}'.`);
                                tableSpec.columns[columnName] = columnSpec;
                            }
                        });
                        logger.info([schemaName, tableName], `Interface '${implementation}' successfully implemented on table '${schemaName}'.'${tableName}'.`);
                    });
                });
            }
            try {
                result.value += transpileSchema([schemaName], schemaSpec);
            }
            catch (e) {
                logger.error([schemaName], e.message);
                callback(e);
            }
        });
    }
    callback(null, result);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = (event, context, callback) => {
    // REVIEW: Handle JSON and YAML strings, too?
    if (!(typeof event === 'object'))
        callback(new Error('Event was not of an object type.'));
    const valid = validate(event);
    if (!valid) {
        callback(new Error(`Input PreQL was invalid. Errors: ${(validate.errors || []).map(e => e.message).join('\r\n')}`));
        return;
    }
    main(event, callback);
};
exports.default = handler;
