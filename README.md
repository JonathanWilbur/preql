# PreQL

* Author: Jonathan M. Wilbur <[jonathan@wilbur.space](mailto:jonathan@wilbur.space)>
* Copyright Year: 2019
* License: [MIT License](https://mit-license.org/)

## What is PreQL?

A Pre-SQL language that can transpile to any SQL dialect. It takes a declarative
Kubernetes-like YAML schema and generates the necessary commands or statements
in the correct order to generate schema and other database objects in the
database dialect of your choice.

## Build

Build by running `tsc` in the root directory.

## Status

In development.

### Architectural Concerns

- Semantics will vary somewhat between target DBMSs, so a single `validateSemantics()`
  will probably prove problematic. However, it is probably better to be _more_ strict
  than necessary in the interest of portability, even if a single DBMS target would
  allow, for example, an `Attribute` without a corresponding `Struct`.
- Different semantic validation might be necessary when ensuring the _absence_ of
  objects. For instance, when ensuring an attribute does not exist, ensuring that
  the table exists first is not really necessary.
- Bifurcation of the database into separate `present` and `absent` indexes mean that
  I have to duplicate code.
- I am not sure how to gracefully pass around an options object, but then again, I
  don't really know what options are necessary.
- It may sound like a silly concern, but what about linguistic characteristics of
  pluralization? Should `.metadata.name` be singular or plural? How do you supply
  both?

### Architectural Decisions

- Should an API call just have a single `objects` array?
  - This would deduplicate and simplify code.
  - If you want to target deletion, you could just run a separate command.
    - Label selectors could be used to pick and choose objects for deletion.
  - `etcd` could contain several indexes instead.
    - `kindIndex`
    - `allObjects`
    - `pathIndex` (This will have to be a string, because objects will compare by reference!)
      - I am not sure how this would be used, though.
        - Maybe `path.startsWith('schemaName.tableName')`?
      - This will probably involve creating a per-kind `path()` accessor.

## To Do

- [ ] Add `multiValued` Attribute member, which makes it a separate relational table in an RDBMS, an array in a DODBMS, and a multi-valued attribute in LDAP.
- [ ] API Objects
  - [x] DataType
    - [x] Check constraint transpilation
    - [ ] Regex check constraint transpilation
    - [x] Setter transpilation
  - [x] Database (A "schema" or "database" in an RDBMS; a "collection" in a DODBMS)
  - [x] Entity (A document in a DODBMS or an entity using an ORM)
  - [x] Struct (A table in an RDBMS)
  - [x] Attribute (A column in an RDBMS)
    - [x] Fix issue with `length` not meaning the same thing across types.
  - [x] PrimaryIndex
  - [x] PlainIndex
  - [x] UniqueIndex
  - [x] TextIndex
  - [x] SpatialIndex
  - [x] ForeignKeyConstraint
  - [x] Preamble
  - [x] Postamble
  - [x] DBMS
  - [ ] Entry
  - [ ] EntrySource? (Require hash for security)
  - [ ] DataPolicy
- [ ] Databases
  - [ ] Must have for 1.0.0
    - [ ] MySQL
    - [ ] MariaDB
    - [ ] Transact-SQL
    - [ ] PostgreSQL
    - [ ] Oracle PL/SQL
    - [ ] OpenLDAP OLC Schema
    - [ ] MongoDB?
  - [ ] Can wait
    - [ ] Microsoft Access
    - [ ] SQLite
    - [ ] H2
    - [ ] IBM DB2
    - [ ] NuoDB
    - [ ] Cassandra
- [ ] Escape strings and test strings with escape characters.
- [x] Delete all check constraints and triggers that start with `preql_`, then recreate them all inside of a transaction, so that no writes occur while there are no checks active.
- [ ] PreQL Log (In-database log of errors, warnings, etc.)
- [ ] Make `getPath()` return an array of strings.
- [ ] Use the fallback operator (`||`) when `get`ing from a `Map` instead of checking for `undefined`.
- [ ] Can there only be one FKC between two tables?
- [ ] Security warnings for attributes containing the terms:
  - `password`
  - `passphrase`
  - `passtoken`
- [x] `apiVersion` checking.
- [ ] Check that nullable attributes do not find their way into a PrimaryIndex
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
- [ ] Quality
  - [ ] Add a lot more logging.
  - [ ] Regexp `pattern`s in JSON schema.
  - [ ] Pass logger into `validateSemantics()` instead of importing, because that
        is the only part of a Kind where logging should be used.
- [ ] Command-Line Interface (CLI) sub-commands
  - [ ] `transpile` (Ensures all objects exist)
  - [ ] `delete` (Ensures that selected objects do not exist)
  - [ ] `get`
  - [ ] `describe`
  - [ ] `test` (Compares a data source against a table)
  - [ ] `tree`
  - [ ] `validate`
  - [ ] `version`
  - [ ] `help`
  - [ ] Command that generates a table of data type support per database.