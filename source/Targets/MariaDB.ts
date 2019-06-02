import APIObjectKind from '../APIObjectKind';
import kinds from '../APIObjectKinds';
import APIObject from '../Interfaces/APIObject';
import Target from '../Target';
import APIObjectIndex from '../Interfaces/APIObjectDatabase';
import logger from '../Loggers/ConsoleLogger';
import DatabaseSpec from '../APIObjectKinds/Database/spec';
import StructSpec from '../APIObjectKinds/Struct/spec';

// This will break once you upgrade to a higher version of MariaDB.
// See: https://dataedo.com/kb/query/mariadb/list-check-constraints-in-database
// eslint-disable-next-line max-len
// https://stackoverflow.com/questions/12637945/how-can-i-delete-all-the-triggers-in-a-mysql-database-using-one-sql-statement
const dropAllPreqlCheckConstraintsForTableTemplate = (db: APIObject<DatabaseSpec>): string => {
  const schemaName: string = db.spec.name;
  const spName: string = `${schemaName}.dropAllPreqlCheckConstraintsForTable`
  return `DROP PROCEDURE IF EXISTS ${spName};\r\n`
  + 'DELIMITER $$\r\n'
  + `CREATE PROCEDURE ${spName} (IN param_table VARCHAR(255))\r\n`
  + 'BEGIN\r\n'
  + '\tDECLARE done BOOLEAN DEFAULT FALSE;\r\n'
  + '\tDECLARE dropCommand VARCHAR(255);\r\n'
  + '\tDECLARE dropCur CURSOR FOR\r\n'
  + `\t\tSELECT concat('ALTER TABLE ${schemaName}.', table_name, ' DROP CONSTRAINT ', constraint_name, ';')\r\n`
  + '\t\tFROM information_schema.table_constraints\r\n'
  + '\t\tWHERE\r\n'
  + "\t\t\tconstraint_type = 'CHECK'\r\n"
  + "\t\t\tAND constraint_name LIKE 'preql_'\r\n"
  + `\t\t\tAND table_schema = '${schemaName}'\r\n`
  + '\t\t\tAND table_name = param_table;\r\n'
  + '\tDECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;\r\n'
  + '\tOPEN dropCur;\r\n'
  + '\tread_loop: LOOP\r\n'
  + '\t\tFETCH dropCur\r\n'
  + '\t\tINTO dropCommand;\r\n'
  + '\t\tIF done THEN\r\n'
  + '\t\t\tLEAVE read_loop;\r\n'
  + '\t\tEND IF;\r\n'
  + '\t\tSET @sdropCommand = dropCommand;\r\n'
  + '\t\tPREPARE dropClientUpdateKeyStmt FROM @sdropCommand;\r\n'
  + '\t\tEXECUTE dropClientUpdateKeyStmt;\r\n'
  + '\t\tDEALLOCATE PREPARE dropClientUpdateKeyStmt;\r\n'
  + '\tEND LOOP;\r\n'
  + '\tCLOSE dropCur;\r\n'
  + 'END $$\r\n'
  + 'DELIMITER ;\r\n\r\n';
};

const MariaDBTarget: Target = {
  transpile: (etcd: APIObjectIndex): string => {
    const transaction: string = [
      'database',
      // 'entity',
      'struct',
      // 'attribute',
      // 'index',
      'primaryindex',
      'foreignkeyconstraint',
      // 'link',
    ].map((kindName: string): string => {
      const kind: APIObjectKind | undefined = kinds.get(kindName);
      if (!kind) throw new Error(`${kindName} kind not recognized.`);
      const objectsOfMatchingKind: APIObject[] | undefined = etcd.kindIndex.get(kindName);
      if (!objectsOfMatchingKind) return '';
      const kindTranspiler = kind.transpilePresenceIn.get('mariadb');
      if (!kindTranspiler) throw new Error('MariaDB not recognized.');
      return objectsOfMatchingKind
        .map((obj: APIObject) => {
          logger.info(`Transpiling ${obj.kind} '${obj.metadata.name}'.`);
          return kindTranspiler(obj, etcd);
        })
        .filter((transpilation: string): boolean => transpilation !== '')
        .join('\r\n\r\n');
    }).join('\r\n\r\n');
    return 'START TRANSACTION;\r\n\r\n'
      + `${(etcd.kindIndex.get('database') || []).map(dropAllPreqlCheckConstraintsForTableTemplate)}`
      + `${(etcd.kindIndex.get('struct') || [])
        .map((apiObject: APIObject<StructSpec>): string => (
          `CALL ${apiObject.spec.databaseName}`
          + `.dropAllPreqlCheckConstraintsForTable('${apiObject.spec.name}');\r\n\r\n`
        )).join('')}`
      + `${transaction}\r\n\r\n`
      + 'COMMIT;\r\n';
  },
};

export default MariaDBTarget;
