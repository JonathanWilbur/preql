import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import StructSpec from '../Struct/spec';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const entityValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'Entity',
  // eslint-disable-next-line
  validateStructure: (apiObject: APIObject<any>): Promise<void> => {
    return new Promise<void>((resolve, reject): void => {
      const valid: boolean = entityValidator(apiObject.spec) as boolean;
      if (valid) {
        resolve();
      } else {
        reject(new Error((entityValidator.errors || []).map(e => e.message).join('; ')));
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
      throw new Error(`No namespaces defined for Entity '${apiObject.metadata.name}' to attach to.`)
    }
    const matchingNamespaceFound: boolean = namespaces
      .some((namespace: APIObject<Spec>): boolean => namespace.metadata.name === labelNamespace);
    if (!matchingNamespaceFound) {
      throw new Error(
        `No namespaces found that are named '${labelNamespace}' for Entity `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }

    // eslint-disable-next-line
    const structs: APIObject<any>[] | undefined = etcd.present.get('struct');
    if (!structs) {
      throw new Error(`No structs defined for Entity '${apiObject.metadata.name}' to attach to.`)
    }
    const matchingStructsFound: boolean = namespaces
      .some((struct: APIObject<StructSpec>): boolean => apiObject.spec.rootStruct === struct.metadata.name);
    if (!matchingStructsFound) {
      throw new Error(
        `No structs found that are named '${apiObject.spec.rootStruct}' for Entity `
        + `'${apiObject.metadata.name}' to use as the root struct.`,
      );
    }
  },
  transpilePresenceIn: new Map([
    [
      'mariadb',
      () => '',
    ],
  ]),
  transpileAbsenceIn: new Map([
    [
      'mariadb',
      () => '',
    ],
  ]),
};

export default kind;
