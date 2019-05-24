import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import AttributeSpec from '../Attribute/spec';
import AttributeKind from '../Attribute/kind';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const structValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'Struct',
  // eslint-disable-next-line
  validateStructure: (apiObject: APIObject<any>): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject): void => {
      const valid: boolean = structValidator(apiObject.spec) as boolean;
      if (valid) {
        resolve([]);
      } else {
        reject(new Error((structValidator.errors || []).map(e => e.message).join('; ')));
      }
    });
  },
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    const labelNamespace: string | undefined = apiObject.metadata.namespace;
    if (!labelNamespace) {
      throw new Error(`No metadata.namespace defined for Entity '${apiObject.metadata.name}'.`)
    }

    // eslint-disable-next-line
    const namespaces: APIObject<any>[] | undefined = etcd.present.get('namespace');
    if (!namespaces) {
      throw new Error(`No namespaces defined for Struct '${apiObject.metadata.name}' to attach to.`);
    }
    const matchingNamespaceFound: boolean = namespaces
      .some((namespace: APIObject<Spec>): boolean => namespace.metadata.name === labelNamespace);
    if (!matchingNamespaceFound) {
      throw new Error(
        `No namespaces found that are named '${labelNamespace}' for Entity `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
  },
  transpilePresenceIn: new Map([
    [
      'mariadb',
      // eslint-disable-next-line
      (apiObject: APIObject<any>, etcd: APIObjectDatabase): string => {
        const columnTranspiler = AttributeKind.transpilePresenceIn.get('mariadb');
        if (!columnTranspiler) {
          throw new Error('Cannot transpile columns for MariaDB.');
        }
        let transpiledAttributes: string[] = [];
        const attributes: APIObject<AttributeSpec>[] | undefined = etcd.present.get('attribute');
        if (attributes) {
          transpiledAttributes = attributes
            .filter((attr: APIObject<AttributeSpec>): boolean => {
              if (!attr.metadata.namespace) return false;
              if (!attr.metadata.labels) return false;
              const databaseName: string = attr.metadata.namespace;
              const tableName: string | undefined = attr.metadata.labels.get('struct');
              if (databaseName === apiObject.metadata.namespace && tableName === apiObject.metadata.name) return true;
              return false;
            }).map((column: APIObject<AttributeSpec>): string => columnTranspiler(column, etcd));
        }
        if (transpiledAttributes.length === 0) {
          throw new Error(`No attributes (columns) found for struct (table) '${apiObject.metadata.name}'.`);
        }
        return 'CREATE TABLE IF NOT EXISTS '
          + `${apiObject.metadata.namespace}.${apiObject.metadata.name} (__placeholder__ BOOLEAN);\r\n\r\n`
          + `${transpiledAttributes.join('\r\n\r\n')}\r\n\r\n`
          + `ALTER TABLE ${apiObject.metadata.name} DROP COLUMN IF EXISTS __placeholder__;\r\n\r\n`;
      },
    ],
  ]),
  transpileAbsenceIn: new Map([
    [
      'mariadb',
      // eslint-disable-next-line
      (apiObject: APIObject<any>) => `DROP TABLE IF EXISTS ${apiObject.metadata.name};\r\n\r\n`,
    ],
  ]),
};

export default kind;
