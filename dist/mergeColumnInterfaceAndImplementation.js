"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mergeColumnInterfaceAndImplementation(interfaceName, path, interfaceColumnSpec, implementationColumnSpec) {
    const [schemaName, tableName, columnName] = path;
    if (implementationColumnSpec.type !== interfaceColumnSpec.type) {
        throw new Error(`Type does not match between interface '${interfaceName}' `
            + `implementation of column '${columnName}' and the existing `
            + 'column by the same name in the specification for table '
            + `'${schemaName}'.'${tableName}'. Actual type was `
            + `'${implementationColumnSpec.type}', but type `
            + `'${interfaceColumnSpec.type}' was expected.`);
    }
    if (implementationColumnSpec.length
        && interfaceColumnSpec.length
        && implementationColumnSpec.length !== interfaceColumnSpec.length) {
        throw new Error(`Length does not match between interface '${interfaceName}' `
            + `implementation of column '${columnName}' and the existing `
            + 'column by the same name in the specification for table '
            + `'${schemaName}'.'${tableName}'. Actual length was `
            + `${implementationColumnSpec.length}, but length of `
            + `${interfaceColumnSpec.length} was expected.`);
    }
    if (!(interfaceColumnSpec.nullable) && implementationColumnSpec.nullable) {
        throw new Error(`Interface '${interfaceName}' says that column `
            + `'${columnName}' must not be nullable, yet its `
            + `conflicting implementation in table '${schemaName}'.'${tableName}'`
            + 'says that it may be nullable.');
    }
    if (interfaceColumnSpec.comment
        && interfaceColumnSpec.comment.length !== 0
        && (implementationColumnSpec.comment || '').length === 0) {
        // eslint-disable-next-line no-param-reassign
        implementationColumnSpec.comment = interfaceColumnSpec.comment;
    }
}
exports.default = mergeColumnInterfaceAndImplementation;
