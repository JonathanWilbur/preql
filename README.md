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

## Usage

1.  Call `validateObject` for each object. This just validates the object against schema.
2.  Call `indexObjects` on the array of validated objects. This produces a
    "database" that the next function will use.
3.  Call `validateNamespace` for each namespace produced by `indexObjects`.
    This performs more semantic validation, such as checking that foreign-key
    constraints are satisfied across objects, and ensuring that `Attribute`s
    belong to a `Struct` that actually exists.

## Develoment Status

There will be three parts of PreQL:

1. The core PreQL library (this)
2. The target-specific libraries (Such as MySQL, PostgreSQL, Transact-SQL, etc.)
3. The command-line interface.

All of these will be published as NPM packages. Each target-specific library will
import the PreQL core library. The command-line interface will import both. The
command-line interface will call exported functionality from the target-specific
libraries to translate PreQL objects to the targeted language.

These target libraries _should_:

- Use `./source/SuggestedTargetObjectHandler.ts` for transpiling individual objects.
- Use `./source/SuggestedTargetIndexHandler.ts` for transpiling the entire database.
  - This should make calls to all of the object-transpiling functions.
- All of the object-transpiling functions should be exposed as Serverless functions.
- Use the `./source/Interfaces/Logger.ts` interface for logging. (`console` already satisfies it.)
  - `./source/NullLogger.ts` may be used as a default for `Logger` parameters.

The above will be _required_ for inclusion in the official CLI. (Except using `NullLogger`.)

The command-line interface will always pass a console-logging object that
implements the `Logger` interface--and this might just be a plain old `console`.

## To Do

- [x] Get rid of all occurrences of `Map`, per [this](https://stackoverflow.com/questions/46066343/convert-typescript-mapstring-string-to-json-string-representation) recommendation.
- [x] Make interface members `readonly`.
- [x] Create `NullLogger`.
- [x] Add `serverName` to `Database`
- [x] Add `minimum` and `maximum` to `DataType`
- [ ] Make schema validation actually work!
- [ ] API Objects
  - [x] DataType
  - [x] Database (A "schema" or "database" in an RDBMS; a "collection" in a DODBMS)
  - [x] Entity (A document in a DODBMS or an entity using an ORM)
  - [x] Struct (A table in an RDBMS)
  - [x] Attribute (A column in an RDBMS)
  - [x] PrimaryIndex
  - [x] PlainIndex
  - [x] UniqueIndex
  - [x] TextIndex
  - [x] SpatialIndex
  - [x] ForeignKeyConstraint
  - [x] Preamble
  - [x] Postamble
  - [x] DBMS
  - [x] Entry
  - [ ] DataPolicy
  - [ ] ReplicationSet
- [x] Delete all check constraints and triggers that start with `preql_`, then recreate them all inside of a transaction, so that no writes occur while there are no checks active.
- [ ] Check that nullable attributes do not find their way into a PrimaryIndex
- [ ] Regexp `pattern`s in JSON schema.
- [ ] Serverless functions
  - [ ] `get-server-uri`
  - [ ] `get-tree` (Displays a hierarchical breakdown of `database`.`struct`.`attribute`)
  - [ ] `get-entity` (Displays a hierarchical breakdown of all the `structs` that go into an `entity`.)
  - [ ] `get-indexed-columns` (Displays a map of `attributes` to `boolean`s indicating whether they have been indexed.)
  - [ ] `get-entries`
  - [ ] `get-data-policy-result`

## Possible Future Features

- [ ] `apiVersion` checking.
- [ ] PreQL Log (In-database log of errors, warnings, etc.)
- [ ] Can there only be one FKC between two tables? (I think there can be more, but this might need follow-up.)