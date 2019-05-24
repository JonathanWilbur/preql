"use strict";
// import { Handler, Context, Callback } from 'aws-lambda';
// import ConsoleLogger from '../../Loggers/ConsoleLogger';
// import dataTypes from '../../DataTypes/index';
// import rootSchema from '../../Schema/index';
// import Column from '../../Column';
// import Index from '../../Index';
// import IndexKey from '../../IndexKey';
// import Table from '../../Table';
// import Schema from '../../Schema';
// import PreqlSchema from '../../PreqlSchema';
// import mergeColumnInterfaceAndImplementation from '../../mergeColumnInterfaceAndImplementation';
// import ForeignKeyConstraint from '../../ForeignKeyConstraint';
// const logger: ConsoleLogger = new ConsoleLogger();
// import Ajv = require('ajv');
// const ajv: Ajv.Ajv = new Ajv({
//   useDefaults: true,
// });
// const validate = ajv.compile(rootSchema);
// function convertPreqlTypeToNativeType(path: [ string, string, string ], spec: Column): string {
//   const type: string = spec.type.toLowerCase();
//   if (type in dataTypes) {
//     return dataTypes[type].mariadb.equivalentNativeType(path, spec, logger);
//   } throw new Error(`${path}: Unrecognized type: ${type}`);
// }
// function transpileCheckExpressions(path: [ string, string, string ], spec: Column): string[] {
//   const type: string = spec.type.toLowerCase();
//   if (type in dataTypes) {
//     return dataTypes[type].mariadb.checkConstraints(path, spec, logger);
//   } throw new Error(`${path}: Unrecognized type: ${type}`);
// }
// function transpileCheckConstraints(path: [ string, string, string ], spec: Column): string {
//   const tableName: string = path[1];
//   const columnName: string = path[2];
//   // TODO: Review constraint name size limits
//   const constraintName = `check_${columnName}_is_valid_${spec.type}`;
//   const constraintExpressions: string[] = transpileCheckExpressions(path, spec);
//   if (constraintExpressions.length === 0) return '';
//   return (
//     `${`ALTER TABLE ${tableName}\r\n`
//     + `DROP CONSTRAINT IF EXISTS ${constraintName};\r\n`
//     + `ALTER TABLE ${tableName}\r\n`
//     + `ADD CONSTRAINT IF NOT EXISTS ${constraintName}\r\n`
//     + 'CHECK (\r\n\t'}${constraintExpressions.join(' AND\r\n\t')}\r\n);`
//   );
// }
// function transpileTriggers(path: [ string, string, string ], spec: Column): string[] {
//   const type: string = spec.type.toLowerCase();
//   if (type in dataTypes) {
//     const setters: { [ name: string ]: string } = dataTypes[type].mariadb.setters(path, spec, logger);
//     return Object.keys(setters)
//       .map((key: string): string => {
//         const triggerBaseName = `${path[0]}.${path[1]}_${path[2]}_${key}`;
//         return ['INSERT', 'UPDATE'].map((event: string): string => {
//           const triggerName = `${triggerBaseName}_${event.toLowerCase()}`;
//           return (
//             `DROP TRIGGER IF EXISTS ${triggerName};\r\n`
//             + `CREATE TRIGGER IF NOT EXISTS ${triggerName}\r\n`
//             + `BEFORE ${event} ON ${path[0]}.${path[1]} FOR EACH ROW\r\n`
//             + `SET NEW.${path[2]} = ${setters[key]};`
//           );
//         }).join('\r\n\r\n');
//       });
//   } throw new Error(`${path}: Unrecognized type: ${type}`);
// }
// function transpileColumn(path: [ string, string, string ], spec: Column): string {
//   const tableName: string = path[1];
//   const columnName: string = path[2];
//   let columnString = `ALTER TABLE ${tableName}\r\nADD COLUMN IF NOT EXISTS ${columnName} `;
//   columnString += convertPreqlTypeToNativeType(path, spec);
//   if (spec.nullable) columnString += ' NULL';
//   else columnString += ' NOT NULL';
//   // Simply quoting the default value is fine, because MySQL will cast it.
//   if (spec.default) columnString += ` DEFAULT '${spec.default}'`;
//   if ('comment' in spec && spec.comment !== '') columnString += `\r\nCOMMENT '${spec.comment}'`;
//   columnString += ';';
//   logger.debug(path, 'Transpiled.');
//   return columnString;
// }
// function transpileIndex(path: [ string, string, string ], spec: Index): string {
//   const indexName: string = path[2];
//   const storedProcedureName: string = `create_index_${indexName}`;
//   const indexType: string = spec.type.toLowerCase();
//   const columnString: string = spec.keys
//     .map((key: IndexKey): string => `${key.column} ${(key.ascending ? 'ASC' : 'DESC')}`)
//     .join(', ');
//   switch (indexType) {
//     case ('plain'): {
//       return (
//         `ALTER TABLE ${path[0]}.${path[1]}\r\n`
//         + `ADD INDEX IF NOT EXISTS ${indexName}\r\n`
//         + `PRIMARY KEY (${columnString});`
//       );
//     }
//     case ('primary'): {
//       const duplicateErrorCode = 1068;
//       return (
//         `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
//         + 'DELIMITER $$\r\n'
//         + `CREATE PROCEDURE IF NOT EXISTS ${storedProcedureName} ()\r\n`
//         + 'BEGIN\r\n'
//         + `\tDECLARE EXIT HANDLER FOR ${duplicateErrorCode} DO 0;\r\n`
//         + `\tALTER TABLE ${path[0]}.${path[1]}\r\n`
//         + `\tADD CONSTRAINT ${indexName} PRIMARY KEY (${columnString});\r\n`
//         + 'END $$\r\n'
//         + 'DELIMITER ;\r\n'
//         + `CALL ${storedProcedureName};\r\n`
//         + `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
//       );
//     }
//     case ('unique'): {
//       const duplicateErrorCode = 1061;
//       return (
//         `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
//         + 'DELIMITER $$\r\n'
//         + `CREATE PROCEDURE IF NOT EXISTS ${storedProcedureName} ()\r\n`
//         + 'BEGIN\r\n'
//         + `\tDECLARE EXIT HANDLER FOR ${duplicateErrorCode} DO 0;\r\n`
//         + `\tALTER TABLE ${path[0]}.${path[1]}\r\n`
//         + `\tADD CONSTRAINT ${indexName} UNIQUE KEY (${columnString});\r\n`
//         + 'END $$\r\n'
//         + 'DELIMITER ;\r\n'
//         + `CALL ${storedProcedureName};\r\n`
//         + `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
//       );
//     }
//     case ('text'): {
//       const duplicateErrorCode = 1061;
//       return (
//         `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
//         + 'DELIMITER $$\r\n'
//         + `CREATE PROCEDURE IF NOT EXISTS ${storedProcedureName} ()\r\n`
//         + 'BEGIN\r\n'
//         + `\tDECLARE EXIT HANDLER FOR ${duplicateErrorCode} DO 0;\r\n`
//         + `\tALTER TABLE ${path[0]}.${path[1]}\r\n`
//         + `\tADD FULLTEXT INDEX (${columnString});\r\n`
//         + 'END $$\r\n'
//         + 'DELIMITER ;\r\n'
//         + `CALL ${storedProcedureName};\r\n`
//         + `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
//       );
//     }
//     case ('spatial'): {
//       const duplicateErrorCode = 1061;
//       return (
//         `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
//         + 'DELIMITER $$\r\n'
//         + `CREATE PROCEDURE IF NOT EXISTS ${storedProcedureName} ()\r\n`
//         + 'BEGIN\r\n'
//         + `\tDECLARE EXIT HANDLER FOR ${duplicateErrorCode} DO 0;\r\n`
//         + `\tALTER TABLE ${path[0]}.${path[1]}\r\n`
//         + `\tADD SPATIAL INDEX (${columnString});\r\n`
//         + 'END $$\r\n'
//         + 'DELIMITER ;\r\n'
//         + `CALL ${storedProcedureName};\r\n`
//         + `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
//       );
//     }
//     default:
//       throw new Error(
//         `${path.join('.')}: Index ${indexName} had unrecognized type '${indexType}'.`
//         + 'This error should never have appeared, because index types should have been'
//         + 'validated by schema validation.',
//       );
//   }
// }
// function transpileTable(path: [ string, string ], spec: Table): string {
//   const schemaName: string = path[0];
//   const tableName: string = path[1];
//   if (!('columns' in spec)) {
//     throw new Error('Table must have columns specification.');
//   }
//   const columnStrings: string[] = [];
//   const checkConstraintStrings: string[] = [];
//   const triggerStrings: string[] = [];
//   const indexStrings: string[] = [];
//   Object.keys(spec.columns).forEach((columnName: string): void => {
//     const columnSpec: Column = spec.columns[columnName];
//     const columnPath: [ string, string, string ] = [schemaName, tableName, columnName];
//     const column: string = transpileColumn(columnPath, columnSpec);
//     const checkConstraint: string = transpileCheckConstraints(columnPath, columnSpec);
//     const triggers : string[] = transpileTriggers(columnPath, columnSpec);
//     columnStrings.push(column);
//     if (checkConstraint.length !== 0) checkConstraintStrings.push(checkConstraint); // REVIEW: Code smell
//     Array.prototype.push.apply(triggerStrings, triggers);
//   });
//   if (spec.indexes) {
//     Object.keys(spec.indexes).forEach((indexName: string): void => {
//       if (!spec.indexes) {
//         throw new Error('spec.indexes was falsy.');
//       }
//       if (!(indexName in spec.indexes)) {
//         throw new Error(`Index '${indexName}' not in spec.indexes.`);
//       }
//       const indexSpec: Index = spec.indexes[indexName];
//       const indexPath: [ string, string, string ] = [schemaName, tableName, indexName];
//       const index: string = transpileIndex(indexPath, indexSpec);
//       indexStrings.push(index);
//     });
//   }
//   logger.info(path, 'Transpiled.');
//   return (
//     `CREATE TABLE IF NOT EXISTS ${tableName} (__placeholder__ BOOLEAN);\r\n\r\n`
//     + `${columnStrings.join('\r\n\r\n')}\r\n\r\n`
//     + `ALTER TABLE ${tableName} DROP COLUMN IF EXISTS __placeholder__;\r\n\r\n`
//     + `${checkConstraintStrings.concat(triggerStrings, indexStrings).join('\r\n\r\n')}`
//   );
// }
// function transpileSchema(path: [ string ], spec: Schema): string {
//   let result = '';
//   if (spec.tables) {
//     // Transpile all of the tables
//     Object.entries(spec.tables).forEach((table: [ string, Table ]): void => {
//       const [tableName, tableSpec] = table;
//       result += transpileTable([path[0], tableName], tableSpec);
//     });
//     // Then, transpile all of the foreign key constraints.
//     Object.entries(spec.tables).forEach((table: [string, Table]): void => {
//       const [tableName, tableSpec] = table;
//       if (tableSpec.foreignkeys) {
//         Object.entries(tableSpec.foreignkeys)
//           .forEach((fk: [ string, ForeignKeyConstraint ]): void => {
//             const [fkName, fkSpec] = fk;
//             result += `ALTER TABLE ${tableName}\r\n`
//               + `ADD CONSTRAINT ${fkName}\r\n`
//               + `FOREIGN KEY IF NOT EXISTS ${fkName}_index `
//               + `(\r\n\t${fkSpec.columns.join(',\r\n\t')}\r\n)\r\n`
//               + `REFERENCES ${fkSpec.referenceTable} `
//               + `(\r\n\t${fkSpec.referenceColumns.join(',\r\n\t')}\r\n);`;
//           });
//       }
//     });
//   }
//   logger.info(path, 'Transpiled.');
//   return result;
// }
// function main(spec: PreqlSchema, callback: Callback<object>): void {
//   const result = {
//     value: '',
//   };
//   if (spec.schema) {
//     Object.entries(spec.schema).forEach((schema: [string, Schema]): void => {
//       const [schemaName, schemaSpec] = schema;
//       // Joining the interfaces to schema.
//       if (
//         schemaSpec.tables
//         && spec.interfaces
//         && Object.keys(schemaSpec.tables).length > 0
//         && Object.keys(spec.interfaces).length > 0
//       ) {
//         Object.entries(schemaSpec.tables).forEach((table: [ string, Table ]): void => {
//           const [tableName, tableSpec] = table;
//           if (!(tableSpec.implements)) return;
//           if (tableSpec.implements.length === 0) return;
//           tableSpec.implements.forEach((implementation: string): void => {
//             if (!spec.interfaces) return;
//             if (!(implementation in spec.interfaces)) {
//               throw new Error(`Interface '${implementation}' not recognized.`);
//             }
//             Object.entries(spec.interfaces[implementation])
//               .forEach((implementationColumn: [ string, Column ]): void => {
//                 const [columnName, columnSpec] = implementationColumn;
//                 const path : [ string, string, string ] = [schemaName, tableName, columnName];
//                 if (columnName in tableSpec.columns) { // Merge conflict
//                   logger.debug(path,
//                     `Merging column '${columnName}' for the implementation of interface '${implementation}'.`);
//                   mergeColumnInterfaceAndImplementation(
//                     implementation,
//                     path,
//                     columnSpec,
//                     tableSpec.columns[columnName],
//                   );
//                 } else { // No merge conflict
//                   logger.debug(path,
//                     `Creating column '${columnName}' for the implementation of interface '${implementation}'.`);
//                   tableSpec.columns[columnName] = columnSpec;
//                 }
//               });
//             logger.info([schemaName, tableName],
//               `Interface '${implementation}' successfully implemented on table '${schemaName}'.'${tableName}'.`);
//           });
//         });
//       }
//       // Validate FK constraints
//       if (schemaSpec.tables) {
//         Object.entries(schemaSpec.tables).forEach((table: [string, Table]): void => {
//           const [tableName, tableSpec] = table;
//           if (!(tableSpec.foreignkeys)) return;
//           Object.entries(tableSpec.foreignkeys).forEach((fk: [string, ForeignKeyConstraint]): void => {
//             const [fkName, fkSpec] = fk;
//             if (!(schemaSpec.tables)) return;
//             // Check that length of columns matches referenceColumns
//             if (!(fkSpec.columns.length !== fkSpec.referenceColumns.length)) {
//               throw new Error(
//                 'Number of columns do not match up between child and parent '
//                 + `table in constraint '${fkName}'. Child table has `
//                 + `${fkSpec.columns.length} columns, yet the parent table `
//                 + `has ${fkSpec.referenceColumns.length} columns.`,
//               );
//             }
//             // Check that all columns exist
//             fkSpec.columns.forEach((columnName: string): void => {
//               if (!(columnName in tableSpec.columns)) {
//                 throw new Error(
//                   `Foreign key constraint '${fkName}' refers to a non-existent `
//                   + `column '${columnName}' in table '${tableName}'.`,
//                 );
//               }
//             });
//             // Check that referenceTable exists
//             if (!(fkSpec.referenceTable in schemaSpec.tables)) {
//               throw new Error(
//                 `Foreign key constraint '${fkName}' refers to a non-existent `
//                 + `table '${fkSpec.referenceTable}'.`,
//               );
//             }
//             const referenceTableSpec: Table = schemaSpec.tables[fkSpec.referenceTable];
//             // Check that referenceColumns exist in referenceTable
//             fkSpec.referenceColumns.forEach((columnName: string): void => {
//               if (!(columnName in referenceTableSpec.columns)) {
//                 throw new Error(
//                   `Foreign key constraint '${fkName}' refers to a non-existent `
//                   + `column '${columnName}' in reference table '${tableName}'.`,
//                 );
//               }
//             });
//             // Check that types of columns matches referenceColumns
//             fkSpec.columns.forEach((columnName: string, columnIndex: number): void => {
//               const columnSpec: Column = tableSpec.columns[columnName];
//               const referenceColumnName: string = fkSpec.referenceColumns[columnIndex];
//               const referenceColumnSpec: Column = referenceTableSpec.columns[referenceColumnName];
//               if (columnSpec.type !== referenceColumnSpec.type) {
//                 throw new Error(
//                   `Type mismatch between columns '${schemaName}.${tableName}.${columnName}' `
//                   + `and '${schemaName}.${fkSpec.referenceTable}.${referenceColumnName}' as `
//                   + `used by foreign key constraint '${fkName}'.`,
//                 );
//               }
//               if (columnSpec.length !== referenceColumnSpec.length) {
//                 throw new Error(
//                   `Length mismatch between columns '${schemaName}.${tableName}.${columnName}' `
//                   + `and '${schemaName}.${fkSpec.referenceTable}.${referenceColumnName}' as `
//                   + `used by foreign key constraint '${fkName}'.`,
//                 );
//               }
//               // TODO: I can't decide if I need to do this.
//               // if (columnSpec.nullable !== referenceColumnSpec.nullable) {
//               //   throw new Error(
//               //     `Type mismatch between columns '${schemaName}.${tableName}.${columnName}' `
//               //     + `and '${schemaName}.${fkSpec.referenceTable}.${referenceColumnName}' as `
//               //     + `used by foreign key constraint '${fkName}'.`,
//               //   );
//               // }
//             });
//             // Check that at least one reference column is a primary key
//             // fkSpec.referenceColumns.some((referenceColumnName: string): boolean => {
//             //   if (!referenceTableSpec.indexes) return false;
//             //   let primaryKeyIndexEncountered = false;
//             //   Object.values(referenceTableSpec.indexes).forEach((index: Index): void => {
//             //     if (index.type === 'primary') {
//             //       primaryKeyIndexEncountered = true;
//             //     }
//             //   });
//             //   // return (referenceTableSpec)
//             // });
//           });
//         });
//       }
//       // TODO: Validate that there is only one primary key index per table.
//       try {
//         result.value += transpileSchema([schemaName], schemaSpec);
//       } catch (e) {
//         logger.error([schemaName], (e as Error).message);
//         callback(e);
//       }
//     });
//   }
//   callback(null, result);
// }
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const handler: Handler<any, object> = (event: any, context: Context, callback: Callback<object>): void => {
//   // REVIEW: Handle JSON and YAML strings, too?
//   if (!(typeof event === 'object')) callback(new Error('Event was not of an object type.'));
//   const valid: boolean = validate(event) as boolean;
//   if (!valid) {
//     callback(new Error(`Input PreQL was invalid. Errors:
// ${(validate.errors || []).map(e => e.message).join('\r\n')}`));
//     return;
//   }
//   main(event, callback);
// };
// export default handler;
