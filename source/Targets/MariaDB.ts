import APIObjectKind from '../APIObjectKind';
import kinds from '../APIObjectKinds';
import APIObject from '../Interfaces/APIObject';
import Target from '../Target';
import APIObjectIndex from '../Interfaces/APIObjectDatabase';
import logger from '../Loggers/ConsoleLogger';

const MariaDBTarget: Target = {
  transpile: (etcd: APIObjectIndex): string => [
    'namespace',
    // 'entity',
    'struct',
    // 'attribute',
    // 'index',
    // 'link',
  ].map((kindName: string): string => {
    const kind: APIObjectKind | undefined = kinds.get(kindName);
    if (!kind) throw new Error(`${kindName} kind not recognized.`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const objectsOfMatchingKind: APIObject<any>[] | undefined = etcd.present.get(kindName);
    if (!objectsOfMatchingKind) return '';
    const kindTranspiler = kind.transpilePresenceIn.get('mariadb');
    if (!kindTranspiler) throw new Error('MariaDB not recognized.');
    return objectsOfMatchingKind
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((obj: APIObject<any>) => {
        logger.info([], `Transpiling ${obj.kind} '${obj.metadata.name}'.`);
        return kindTranspiler(obj, etcd);
      })
      .filter((transpilation: string): boolean => transpilation !== '')
      .join('\r\n\r\n');
  }).join('\r\n\r\n'),
};

export default MariaDBTarget;
