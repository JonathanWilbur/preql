import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../APIObjectKind';
import schema from './schema';
import Spec from './spec';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import matchingResource from '../matchingResource';
import AttributeSpec from '../Attribute/spec';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'ForeignKeyConstraint',
  getPath: (apiObject: APIObject<Spec>): string => {
    const databaseName: string = apiObject.spec.databaseName || '';
    const constraintName: string = apiObject.spec.name || '';
    return `${databaseName}.${constraintName}`;
  },
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    if (!matchingResource(apiObject.spec.databaseName, 'database', etcd)) {
      throw new Error(
        `No databases found that are named '${apiObject.spec.databaseName}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (!matchingResource(apiObject.spec.child.struct, 'struct', etcd)) {
      throw new Error(
        `No structs found that are named '${apiObject.spec.child.struct}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (!matchingResource(apiObject.spec.parent.struct, 'struct', etcd)) {
      throw new Error(
        `No structs found that are named '${apiObject.spec.parent.struct}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }

    if (apiObject.spec.child.key.length !== apiObject.spec.parent.key.length) {
      throw new Error(
        `Number of key attributes in child struct '${apiObject.spec.child.struct}' `
        + 'does not match the number of key attributes in the parent struct '
        + `'${apiObject.spec.parent.struct}' for the ForeignKeyConstraint named `
        + `'${apiObject.metadata.name}'.`,
      )
    }

    const columns: APIObject<AttributeSpec>[] | undefined = etcd.kindIndex.get('attribute');
    if (!columns || columns.length === 0) {
      throw new Error(
        `No attributes found for ${apiObject.kind} '${apiObject.metadata.name}' `
        + 'to use as keys.',
      );
    }

    const childStructAttributes: Map<string, APIObject<AttributeSpec>> = new Map<string, APIObject<AttributeSpec>>(
      columns
        .filter((attr: APIObject<AttributeSpec>): boolean => (
          attr.spec.structName.toLowerCase() === apiObject.spec.child.struct.toLowerCase()
          && attr.spec.databaseName.toLowerCase() === apiObject.spec.databaseName.toLowerCase()
        ))
        .map((attr: APIObject<AttributeSpec>): [ string, APIObject<AttributeSpec> ] => [
          attr.spec.name.toLowerCase(),
          attr,
        ]),
    );

    const parentStructAttributes: Map<string, APIObject<AttributeSpec>> = new Map<string, APIObject<AttributeSpec>>(
      columns
        .filter((attr: APIObject<AttributeSpec>): boolean => (
          attr.spec.structName.toLowerCase() === apiObject.spec.parent.struct.toLowerCase()
          && attr.spec.databaseName.toLowerCase() === apiObject.spec.databaseName.toLowerCase()
        ))
        .map((attr: APIObject<AttributeSpec>): [ string, APIObject<AttributeSpec> ] => [
          attr.spec.name.toLowerCase(),
          attr,
        ]),
    );

    apiObject.spec.child.key.forEach((key: { columnName: string }): void => {
      if (!childStructAttributes.has(key.columnName.toLowerCase())) {
        console.log(childStructAttributes);
        throw new Error(
          `Child struct '${apiObject.spec.child.struct}' has no column named `
          + `'${key.columnName}' to which ForeignKeyConstraint `
          + `'${apiObject.metadata.name}' can apply.`,
        );
      }
    });

    apiObject.spec.parent.key.forEach((key: { columnName: string }): void => {
      if (!parentStructAttributes.has(key.columnName.toLowerCase())) {
        throw new Error(
          `Parent struct '${apiObject.spec.parent.struct}' has no column named `
          + `'${key.columnName}' to which ForeignKeyConstraint `
          + `'${apiObject.metadata.name}' can apply.`,
        );
      }
    });

    // Note that nullability should not factor into the FKC.
    apiObject.spec.child.key.forEach((key: { columnName: string }, index: number): void => {
      const childAttributeName: string = key.columnName.toLowerCase();
      const childAttribute: APIObject<AttributeSpec> | undefined = childStructAttributes.get(childAttributeName);
      const parentAttributeName: string = apiObject.spec.parent.key[index].columnName.toLowerCase();
      const parentAttribute: APIObject<AttributeSpec> | undefined = parentStructAttributes
        .get(parentAttributeName);
      if (!childAttribute) throw new Error('Assertion failed.');
      if (!parentAttribute) throw new Error('Assertion failed');
      if (
        childAttribute.spec.type !== parentAttribute.spec.type
        || (
          // Remember, sometimes length is undefined legitimately.
          childAttribute.spec.length
          && parentAttribute.spec.length
          && childAttribute.spec.length !== parentAttribute.spec.length
        )
      ) {
        throw new Error(
          'Mismatching types between these columns used in ForeignKeyConstraint '
          + `'${apiObject.metadata.name}': '${key.columnName}' and '${parentAttributeName}'.`,
        );
      }
    });
  },
  transpilePresenceIn: new Map([
    [
      'mariadb',
      (apiObject: APIObject<Spec>): string => {
        const storedProcedureName: string = `${apiObject.spec.databaseName}.create_${apiObject.spec.name}`;
        return `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
          + 'DELIMITER $$\r\n'
          + `CREATE PROCEDURE IF NOT EXISTS ${storedProcedureName} ()\r\n`
          + 'BEGIN\r\n'
          + '\tDECLARE EXIT HANDLER FOR 1005 DO 0;\r\n'
          + `\tALTER TABLE ${apiObject.spec.databaseName}.${apiObject.spec.child.struct}\r\n`
          + `\tADD CONSTRAINT ${apiObject.spec.name} FOREIGN KEY\r\n`
          + `\tIF NOT EXISTS ${apiObject.spec.name}_index\r\n`
          + `\t(\r\n\t\t${apiObject.spec.child.key.map(k => k.columnName).join(',\r\n\t\t')}\r\n\t)\r\n`
          + `\tREFERENCES ${apiObject.spec.parent.struct}\r\n`
          + `\t(\r\n\t\t${apiObject.spec.parent.key.map(k => k.columnName).join(',\r\n\t\t')}\r\n\t)\r\n`
          + `\tON DELETE ${apiObject.spec.onDeleteAction.toUpperCase() || 'RESTRICT'}\r\n`
          + `\tON UPDATE ${apiObject.spec.onUpdateAction.toUpperCase() || 'RESTRICT'};\r\n`
          + 'END $$\r\n'
          + 'DELIMITER ;\r\n'
          + `CALL ${storedProcedureName};\r\n`
          + `DROP PROCEDURE IF EXISTS ${storedProcedureName};`;
      },
    ],
  ]),
  transpileAbsenceIn: new Map([
    [
      'mariadb',
      (apiObject: APIObject<Spec>) => 'ALTER TABLE '
        + `${apiObject.spec.databaseName}.${apiObject.spec.child.struct}\r\n`
        + `DROP FOREIGN KEY IF EXISTS ${apiObject.spec.name};`,
    ],
  ]),
};

export default kind;
