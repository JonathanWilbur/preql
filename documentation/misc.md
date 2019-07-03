# Miscellaneous Notes

According to
[this](https://stackoverflow.com/questions/36870972/using-before-insert-trigger-to-change-the-datatype-of-incoming-data-to-match-t),
you will not be able to use BEFORE INSERT triggers to change incoming data types.

[Trigger vs. Check Constraint](https://www.sqlservercentral.com/forums/topic/check-constraint-vs-trigger).

Using triggers suddenly appeals to me because you can set custom error messages, like so:

```sql
DELIMITER //
CREATE TRIGGER bi_user
  BEFORE INSERT ON user
  FOR EACH ROW
BEGIN
  IF NEW.email NOT LIKE '_%@_%.__%' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email field is not valid';
  END IF;
END; //
DELIMITER ;
```

[Constraints should be used, where possible](https://www.sqlshack.com/are-sql-server-database-triggers-evil/)

In Azure MariaDB, I had to set `log_bin_trust_function_creators` to `ON` to be
able to create triggers. This is a global variable, which means you need
escalated privileges to modify it.

If this were done directly in SQL, it would be done with this query:

```sql
set global log_bin_trust_function_creators = 1;
```

## Creating an index if it might exist

In MariaDB, there is no `IF NOT EXISTS` option for indexes. I found this clever
way of ignoring "already exists" errors when creating indexes instead:

```sql
DROP PROCEDURE IF EXISTS create_indexes;
DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS create_indexes ()
BEGIN
 DECLARE EXIT HANDLER FOR 1068 DO 0;
 ALTER TABLE testeroni.people ADD PRIMARY KEY (lastname);
END $$
DELIMITER ;
CALL create_indexes;
DROP PROCEDURE IF EXISTS create_indexes;
```

The `1068` error code means "primary key already defined." The `DO 0` is a
no-op.

## Linking objects

Use labels to link objects, but if a `matchSelector` exists, use that instead.

```yaml
apiVersion: 1.0.0
kind: Attribute
metadata:
  name: furColor
  labels:
    struct: bunnies
spec:
  ...
```

or

```yaml
apiVersion: 1.0.0
kind: Attribute
metadata:
  name: furColor
spec:
  structSelector:
    matchSelector:
      key: struct
      operator: in
      values:
        - bunnies
```

The former can be implemented first, then the latter can be introduced as a
feature later on.

Then again, it might not be wise to use selectors, because a change to one
column could propagate to unexpected changes elsewhere. On the other hand,
you could just say that the developer needs to be cautious.

## Plural vs. Singular

See [this](https://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names).

## How views could work

It would look something like this.

```yaml
spec:
  select:
    - attributeName: bloop
      structName: people
      alias: woop
  from:
    - people
    - cars
  joinType: left
  joinOn:
    - attribute: id
      struct: people
  where:
    - attribute: woop
      operator: lessThan
      value: 5
      next: and
    - attribute: bling
      operation: is
      value: True
```

Operators:

- lessThan
- lessThanOrEqual
- equal / is
- moreThan
- moreThanOrEqual
- in

The problem is that views often depend on joins, so I need some way of doing
joins.

JoinTypes:

- left
- right
- inner
- outer
- cross / cartesian

## Data Types as an API Object Kind

An example demonstrating regexes:

```yaml
apiVersion: preql/1.0.0
kind: DataType
metadata:
  name: IPAddress
spec:
  regexes:
    pcre:
      ipv4: # Both of the below must match.
        - pattern: '\d+\.\d+\.\d+\.\d+'
          positive: True # If this matches, we have a match.
        - pattern: '.*[a-zA-Z].*'
          positive: False # If this matches, we do not have a match.
      ipv6: # Or, this must match.
        - pattern: '[0-9a-fA-F:]+'
    tsql:
      ipv4:
        - pattern: '%hello%'
  nativeTypeMap:
    mysql: 'VARCHAR(32)'
    tsql: 'VARCHAR(32)'
```

An example demonstrating length-switched returns and return templating.
Should I break `return` into `return` and `returnTemplate`?

```yaml
apiVersion: preql/1.0.0
kind: DataType
metadata:
  name: JPEGPhoto
spec:
  nativeTypeMap:
    # mysql: 'VARBINARY(%L)'
    tsql:
      warnIfLengthIsGreaterThan: 12345
      failIfLengthIsGreaterThan: 12346
      return: 'VARBINARY(%L)'
    ldap:
      return: '1.2.3.4{%L}'
    mariadb:
      lengthSwitchedReturn:
        1: 'BOOLEAN'
        4: 'TINYBLOB'
        8: 'TINYBLOB'
        16: 'BLOB'
        24: 'MEDIUMBLOB'
        32: 'LONGBLOB' # Defaults to this, since its the largest number.
        # Displays a warning if the length is greater than 32.
```

An example demonstrating check constraints:

```yaml
apiVersion: preql/1.0.0
kind: DataType
metadata:
  name: Month
spec:
  nativeTypeMap:
    mysql: 'TINYINT UNSIGNED'
    tsql: 'TINYINT'
  check:
    mysql:
      - '%n > 0'
      - '%n < 13'
```

An example demonstrating triggers:

```yaml
apiVersion: preql/1.0.0
kind: DataType
metadata:
  name: MACAddress
spec:
  nativeTypeMap:
    mysql: 'CHAR(20)'
    tsql: 'CHAR(20)'
  triggers:
    mysql:
      - 'UPPER(%n)' # We want the alphabetic hex chars to be stored in uppercase.
```

Needed features:

- Length bits %l
- Length bytes %L
- Bits of data that the length could indicate %b
- Bytes of data that the length could indicate  %B
- Decimal minimum %d
- Decimal maximum %D
- Attribute name %a
- Struct name %s
- Entity name %e
- Database name %d
- `integral` (Might be useful for permitting not-exactly-matching types in FKCs later on)
- `real`
- `string`
- `binary`
- Warning when lengths are too big.
- Triggers

Potential feature: sentitivity

```yaml
apiVersion: preql/1.0.0
kind: DataType
metadata:
  name: Password
spec:
  nativeTypeMap:
    mysql: 'VARCHAR(20)'
    tsql: 'VARCHAR(20)'
  sensitivity:
    # This data type usually contains security-sensitive information.
    # You would want to use this for data types like Password or
    # PrivateKey or Salt or PINNumber.
    security: True
    # This data type usually contains legally-sensitive information, such as
    # healthcare data protected by HIPAA. An 'ICD10Code' data type might be
    # an example where you would use this, since ICD-10 Codes, if associated
    # with a real patient visit, constitute HIPAA-protected health information.
    legality: False
    # This data type usually contains proprietary information. An example
    # where you would use this might be ProgrammingLanguage or
    # ThirdPartyLibraryName.
    proprietary: False
```

The use case for this is that the PreQL transpiler can emit warnings when
certain datatypes are used, flag whole tables as being sensitive, and
make sensitive attributes or tables inaccessible to all users by default. A
corresponding view with only the non-sensitive columns could also be generated.

For security-sensitive data types, specifically, an emitted warning could say:

> WARNING: Storing plain-text passwords in a database is a dangerous practice.
> If the database is compromised by a hacker or exfiltrated, the passwords are
> compromised as well. Consider storing secure cryptographic hashes of salted
> passwords instead. For more information, see these links: ...

Or, the PreQL transpiler could outright fail unless a flag is given on the
command line, such as `--i-understand-cwe-257`, but that probably would not
be implemented at the `DataType` level.

If legally-sensitive attributes are stored, query logging settings could be
queried, and adding the column could fail if no query logs are kept.

Alternatively, instead of using sensitivity flags, a new API Object kind,
possibly named `DataPolicy` could use a `matchSelector` on labels, then
have these policies:

- `requireQueryLogs`
- `requireSlowQueryLogs`
- `requireInsertLogs` (Create insert triggers that insert an entry in a restricted table.)
- `requireUpdateLogs` (Create update triggers that insert an entry in a restricted table.)
- `requireFlag`

With these actions being taken in non-compliance:

- `displayWarning` (Add the attribute, but warn.)
- `addWarningEntryInTable`
- `ignore` (Skip over the attibute entirely.)
<!-- - `remove` (Transpile the code to remove the attribute, if present.) -->
- `drop` (Transpile the code to remove the attribute, if present, deleting all data in this column.)
- `delete` (Set all entries in this column to `NULL`.)
- `dropIfEmpty`

The `matchSelector` could also be a regex that matches `metadata.name` or `spec.name`.
If you want to display a warning every time, the policies could just be empty.

## How to drop all CHECK constraints for a table

This is used because the `CHECK` constraints can be trivially rebuilt. I got
this code from [here](https://stackoverflow.com/questions/17072786/drop-all-table-constraints-in-mysql).

```mysql
DROP PROCEDURE IF EXISTS testeroni.dropAllConstraintsForColumn;
DELIMITER $$
CREATE PROCEDURE testeroni.dropAllCheckConstraintsForColumn(IN param_schema VARCHAR(255), in param_table VARCHAR(255))
BEGIN
    DECLARE done BOOLEAN DEFAULT FALSE;
    DECLARE dropCommand VARCHAR(255);
    DECLARE dropCur CURSOR FOR
        SELECT concat('alter table ', table_schema, '.', table_name, ' DROP CONSTRAINT ', constraint_name, ';')
        FROM information_schema.table_constraints
        WHERE
            constraint_type = 'CHECK'
            AND table_schema = param_schema
            AND table_name = param_table;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    OPEN dropCur;
    read_loop: LOOP
        FETCH dropCur
        INTO dropCommand;
        IF done THEN
            LEAVE read_loop;
        END IF;
        SET @sdropCommand = dropCommand;
        PREPARE dropClientUpdateKeyStmt FROM @sdropCommand;
        EXECUTE dropClientUpdateKeyStmt;
        DEALLOCATE PREPARE dropClientUpdateKeyStmt;
    END LOOP;
    CLOSE dropCur;
END $$
DELIMITER ;
-- call testeroni.dropAllConstraintsForColumn('testeroni', 'people');
```

## How to drop all triggers for a table

I got this idea from [here](https://stackoverflow.com/questions/12637945/how-can-i-delete-all-the-triggers-in-a-mysql-database-using-one-sql-statement).

```sql
-- set `group_concat_max_len`
SET @@session.group_concat_max_len = @@global.max_allowed_packet;

-- select all the triggers and build the `DROP TRIGGER` SQL
-- replace <your_schema> with your schema name (e.g. your database name)
SELECT GROUP_CONCAT(sql_string SEPARATOR '\n')
FROM (
    SELECT CONCAT('DROP TRIGGER IF EXISTS `', TRIGGER_NAME, '`;') AS sql_string,'1'
    FROM information_schema.TRIGGERS WHERE TRIGGER_SCHEMA = '<your_schema>'
    ) AS sql_strings
GROUP BY '1';
```

## Fundamental assumptions of PreQL

- Anything PreQL defines, PreQL has full access to.
- All triggers and checks will automatically be prefixed with `preql_`.

## Azure Functions

I am not going to support Azure functions until
[this shameful joke of a plugin](https://github.com/serverless/serverless-azure-functions)
improves.