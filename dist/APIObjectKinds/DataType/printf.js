"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function printf(template, attribute) {
    const lengthBits = (attribute.spec.length || 0); // %l
    const lengthBytes = Math.ceil((attribute.spec.length || 0) / 8); // %L
    const maximumBytes = (2 ** lengthBits); // %B
    const maximumBits = (maximumBytes * 8); // %b
    // const name: string = attribute.spec.name; // %a or %n
    const struct = 'structName' in attribute.spec ? attribute.spec.structName : ''; // %s
    const entity = ('entityName' in attribute.spec && attribute.spec.entityName)
        ? attribute.spec.entityName : ''; // %e
    const database = attribute.spec.databaseName; // %D
    return template
        .replace(/%l/g, lengthBits.toString())
        .replace(/%L/g, lengthBytes.toString())
        .replace(/%B/g, maximumBytes.toString())
        .replace(/%b/g, maximumBits.toString())
        .replace(/%a/g, attribute.spec.name.toString())
        .replace(/%n/g, attribute.spec.name.toString())
        .replace(/%s/g, struct.toString())
        .replace(/%e/g, entity.toString())
        .replace(/%D/g, database.toString());
}
exports.default = printf;
;
