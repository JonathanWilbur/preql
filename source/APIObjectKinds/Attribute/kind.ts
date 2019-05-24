import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import dataTypes from '../../DataTypes/index';
import logger from '../../Loggers/ConsoleLogger';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const attributeValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'Attribute',
  // eslint-disable-next-line
  validateStructure: (apiObject: APIObject<any>): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject): void => {
      const valid: boolean = attributeValidator(apiObject.spec) as boolean;
      if (valid) {
        resolve([]);
      } else {
        reject(new Error((attributeValidator.errors || []).map(e => e.message).join('; ')));
      }
    });
  },
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    const labeledNamespace: string | undefined = apiObject.metadata.namespace;
    if (!labeledNamespace) {
      throw new Error(`No metadata.namespace defined for Attribute '${apiObject.metadata.name}'.`);
    }
    if (!(apiObject.metadata.labels)) {
      throw new Error(
        `Attribute '${apiObject.metadata.name}' needs labels to associate `
        + 'it to a namespace (database) and struct (table).',
      );
    }
    const labeledStruct: string | undefined = apiObject.metadata.labels.get('struct');
    if (!labeledStruct) {
      throw new Error(`No metadata.namespace defined for Attribute '${apiObject.metadata.name}'.`);
    }

    // eslint-disable-next-line
    const namespaces: APIObject<any>[] | undefined = etcd.present.get('namespace');
    if (!namespaces) {
      throw new Error(`No namespaces defined for attribute '${apiObject.metadata.name}' to attach to.`);
    }
    const matchingNamespaceFound: boolean = namespaces
      .some((namespace: APIObject<Spec>): boolean => namespace.metadata.name === labeledNamespace);
    if (!matchingNamespaceFound) {
      throw new Error(
        `No namespaces found that are named '${labeledNamespace}' for attribute `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }

    // eslint-disable-next-line
    const structs: APIObject<any>[] | undefined = etcd.present.get('struct');
    if (!namespaces) {
      throw new Error(`No structs defined for attribute '${apiObject.metadata.name}' to attach to.`);
    }
    const matchingStructFound: boolean = namespaces
      .some((struct: APIObject<Spec>): boolean => struct.metadata.name === labeledStruct);
    if (!matchingStructFound) {
      throw new Error(
        `No structs found that are named '${labeledStruct}' for attribute `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
  },
  transpilePresenceIn: new Map([
    [
      'mariadb',
      (apiObject: APIObject<Spec>) => {
        const schemaName: string | undefined = apiObject.metadata.namespace;
        if (!(apiObject.metadata.labels)) {
          throw new Error(
            `Attribute '${apiObject.metadata.name}' needs labels to associate `
            + 'it to a namespace (database) and struct (table).',
          );
        }
        const tableName: string | undefined = apiObject.metadata.labels.get('struct');
        const columnName: string = apiObject.metadata.name;
        let columnString = `ALTER TABLE ${schemaName}.${tableName}\r\nADD COLUMN IF NOT EXISTS ${columnName} `;
        // columnString += convertPreqlTypeToNativeType(path, spec);
        const type: string = apiObject.spec.type.toLowerCase();
        const path: [ string, string, string ] = [
          schemaName || '',
          tableName || '',
          columnName,
        ];
        if (type in dataTypes) {
          columnString += dataTypes[type].mariadb.equivalentNativeType(path, apiObject.spec, logger);
        } else {
          throw new Error(`${path}: Unrecognized type: ${type}`);
        }
        if (apiObject.spec.nullable) columnString += ' NULL';
        else columnString += ' NOT NULL';
        // Simply quoting the default value is fine, because MySQL will cast it.
        if (apiObject.spec.default) columnString += ` DEFAULT '${apiObject.spec.default}'`;
        if (apiObject.metadata.annotations && apiObject.metadata.annotations.has('comment')) {
          columnString += `\r\nCOMMENT '${apiObject.metadata.annotations.get('comment')}'`;
        }
        columnString += ';';
        // logger.debug(path, 'Transpiled.');
        return columnString;
      },
    ],
  ]),
  transpileAbsenceIn: new Map([
    [
      'mariadb',
      // eslint-disable-next-line
      (apiObject: APIObject<any>) => '',
    ],
  ]),
};

export default kind;
