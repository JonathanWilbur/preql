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

The command-line interface will always pass a console-logging object that
implements the `Logger` interface--and this might just be a plain old `console`.

### Versioning

Unfortunately, I moved this library into version 1.0.0-beta way too soon. I
have made so many changes that I have had to increment it to version
"1.0.0-charlie", and I expect the versions to continue to not make much sense
until I really release version 1.0.0. I will release version 1.0.0 when I have
created transpilation libraries for MariaDB, OpenLDAP, and MongoDB; doing so
will constitute a thorough testing of the library on a wide variety of DBMSs.

## Prior to 1.0.0

- [x] pathIndex (`fully.qualified.path`) (This must be unique.)
- [x] Check for uniqueness across case as well!
- [x] Ensure that text indexes are only applied to types where `jsonEquivalent` is `string`
- [x] `get-indexed-columns` Serverless function
- [x] Rename `keyColumns` and `includedColumns` to `keyAttributes` and `includedAttributes`
- [x] ~~Add `minLength` and `maxLength` for strings?~~ (Got rid of `length` altogether.)
- [x] Check for non-collision among `Attribute` and `ForeignKey`
- [x] ~~Check for non-collision among index types.~~ (Already taken care of by `path` constraints.)
- [x] Add `Enum` type?
- [x] Document why `Set` and `Range` types will not be supported.
- [x] ~~Make `matchingResource()` check within the database!~~
- [x] Apply `prohibitedIdentifiers` to `Database`, `Struct`, `Entity`, etc.
- [x] Make sure that there are _some_ attributes in Entry.spec.values
- [x] Change occurrences of `apiObject` to `obj` or something more succinct or descriptive.
- [x] Do something about potentially conflicting `Entity` and `Struct` paths.
- [x] Do something about potentially conflicting `CharacterSet`, `Collation`, and `Database` paths?
- [x] Use my own ESLint rules
- [x] Set up GitHub Actions
- [x] Configure testing with Jest
- [x] Configure Webpack builds
- [x] Review TODOs
- [x] Organize all imports
- [x] Test with transpilers
  - [x] MariaDB
  - [x] OpenLDAP
  - [x] BSON Schema
- [x] Append ID numbers to the paths of `Entry` types.
- [x] Remove validation logic from `getServerURI()`.
- [x] Test `getPath()` with objects with `entityName` set.
- [x] Test more collisions in `indexObjects()`.
  - [x] Especially `Entry`.
- [x] Test indexes in `validateNamespace()`.
- [x] Test `matchLabels()` a lot more.
- [x] ~~Test Serverless functions.~~
- [x] ~~Add an explanatory field for enum values?~~
- [ ] Use a field in the target field to ignore regexes or setters?
- [ ] Sparse Attribute / Index
- [ ] Another benefit: unit-testing your schema with labels.exampleValue
- [ ] Entry: "layer" to help with hierarchical insertions.
- [ ] Website that generates documentation from the schema
- [ ] Use lowercase more in standard types
- [ ] Ensure that the generated name of a multi-valued `Attribute` table will not conflict.
- [ ] Remove Serverless normalization from `normalizeError`.
- [ ] Test casing.
- [ ] Test `jsonEquivalent` field.
- [ ] Test unknown types.
- [ ] Test more path collisions.
- [ ] Add `objectIdentifierIndex` to `APIObjectDatabase`
- [ ] Add `distinguishedNameIndex` to `APIObjectDatabase`
- [ ] Errors indicating when you are passing in the wrong datatype for non-Typescript use.
- [ ] Test that index attributes from different databases or structs cannot be found.
- [ ] Test that namespaces are sorted correctly.

## After 1.0.0

- [ ] JSDoc documentation on everything
  - [ ] Use types on `@param` and `@returns` directives.
  - [ ] Use `@returns`
  - [ ] Use `@see` where appropriate.
  - [ ] Figure out what to do about `@returns` when a `Promise` is returned.
- [ ] `README.md` documentation
- [ ] Additional Markdown documentation
- [ ] Examples.
- [ ] JSONSchema titles and descriptions
- [ ] Set up Azure Pipeline
- [ ] Document Adjacency lists.

## Possible Future Features

- [ ] `apiVersion` checking.
- [ ] PreQL Log (In-database log of errors, warnings, etc.)
- [ ] Can there only be one FKC between two tables? (I think there can be more, but this might need follow-up.)
- [ ] `ReplicationSet` kind
- [ ] `VirtualAttribute` kind
- [ ] `Shard` kind
- [ ] `Sequence` kind
- [ ] `Event` kind
- [ ] `HASH` setter, or something else for hashing
  - This would be _really_ useful for secure password storage.
- [ ] `CONCAT` setter (Check if string begins or ends with something, and CONCAT if not present.)
- [ ] Add information about error codes in `getPreqlInfo`.
- [ ] Add `Promise` resolution and rejection value documentation when [this issue](https://github.com/jsdoc/jsdoc/issues/1467) is closed.
- [ ] Handle support or non-support for Unicode Characters
