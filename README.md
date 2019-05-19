# PreQL

* Author: [Jonathan M. Wilbur](https://jonathan.wilbur.space) <[jonathan@wilbur.space](mailto:jonathan@wilbur.space)>
* Copyright Year: 2019
* License: [MIT License](https://mit-license.org/)

## What is PreQL?

A Pre-SQL language that can transpile to any SQL dialect.

## Build

Build by running `tsc` in the root directory.

## Status

In development, and being overhauled: I am changing this to use a more
Kubernetes-like API.

## To Do

- [ ] Kubernetes-Like API
  - [ ] API Objects
    - [ ] DataType
    - [ ] Namespace (A "schema" or "database" in an RDBMS)
    - [ ] Entity (A document in a DODBMS)
    - [ ] Struct (A table in an RDBMS)
    - [ ] Attribute (A column in an RDBMS)
      - [ ] Virtual
    - [ ] PrimaryIndex
    - [ ] PlainIndex
    - [ ] UniqueIndex
    - [ ] TextIndex
    - [ ] SpatialIndex
    - [ ] ForeignKeyConstraint
    - [ ] View
    - [ ] Function
    - [ ] StoredProcedure
    - [ ] Role
    - [ ] User
    - [ ] Preamble
    - [ ] Postamble
- [ ] Databases
  - [ ] Must have for 1.0.0
    - [ ] MySQL
    - [ ] MariaDB
    - [ ] Transact-SQL
    - [ ] PostgreSQL
    - [ ] Oracle PL/SQL
    - [ ] LDAP
    - [ ] MongoDB?
  - [ ] Can wait
    - [ ] Microsoft Access
    - [ ] SQLite
    - [ ] H2
    - [ ] IBM DB2
    - [ ] NuoDB
    - [ ] Cassandra
- [ ] Escape strings and test strings with escape characters.
- [ ] PreQL Log (In-database log of errors, warnings, etc.)
- [ ] Use fully-qualified names everywhere possible.
- [ ] Data Types
  - [ ] URC (Uniform Resource Citation)
  - [ ] [Data URI](https://en.wikipedia.org/wiki/Data_URI_scheme)
  - [ ] UNC
  - [ ] ipv4
  - [ ] ipv6
  - [ ] ip
  - [ ] latitude
  - [ ] longitude
  - [ ] degrees (like an angle, not temperature)
  - [ ] dayname (e.g. "MONDAY")
  - [ ] base2
  - [ ] base8
  - [ ] base10
  - [ ] base16
  - [ ] base32
  - [ ] base36
  - [ ] base58
  - [ ] base64
  - [ ] base85
  - [ ] base91
  - [ ] [base122](https://en.wikipedia.org/wiki/Binary-to-text_encoding)
  - [ ] percentencoded?
  - [ ] z85
  - [ ] phone
  - [ ] twitter
  - [ ] ssn
  - [ ] paymentcard
  - [ ] doi
  - [ ] ean
  - [ ] upc
  - [ ] gtin
  - [ ] unixperm
  - [ ] sddl
- [ ] Tools
  - [ ] Tool that generates a table of data type support per database.
- [ ] Add `lengthUnits` field to each type.
- [ ] Quality
  - [ ] Check that everything is lower-cased.
  - [ ] Make a new error type that includes the path.
  - [ ] Use `Object.freeze()`
  - [ ] Use `Object.entries()` instead of `Object.keys()` where the values are needed.
  - [x] Configure ESLint
  - [x] Use [AirBnB's ESLint](https://github.com/iamturns/eslint-config-airbnb-typescript), if possible.
  - [ ] Strict Null Checks
  - [ ] New `Error` type.
  - [ ] Create path types
  - [ ] Add a lot more logging.
  - [ ] Regexp `pattern`s in JSON schema.
  - [ ] Refactor universal validation
    - [ ] `validateStructure()` (This comes from `ajv`.)
    - [ ] `validateSemantics()`
  - [ ] Convenience attributes
    - [ ] `schema.tables.table.primaryKeyIndexName`
    - [ ] `schema.tables.table.columns.column.indexInPrimaryKey`
    - [ ] `schema.tables.table.columns.column.indexInForeignKey`
    - [ ] `schema.tables.table.columns.inheritedFromInterface`