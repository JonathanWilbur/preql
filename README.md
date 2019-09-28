# PreQL

* Author: Jonathan M. Wilbur <[jonathan@wilbur.space](mailto:jonathan@wilbur.space)>
* Copyright Year: 2019
* License: [MIT License](https://mit-license.org/)

## What is PreQL?

A Pre-SQL language for schema that can transpile to any SQL dialect. It uses a
declarative Kubernetes-like YAML schema and generates the necessary commands or
statements in the correct order to generate schema and other database objects
in the database dialect of your choice. It also enables you to label your
schema and interact with it programmatically, which is harder to do with
traditional DBMS-specific schema.

## Build

1. Clone the repository.
2. Install the necessary components by running `npm install` in the root directory.
3. Build by running `npm run build` in the root directory.

## Usage

This library is not useful alone. It is meant to be included in other programs
that transpile PreQL into DBMS-specific DDL. Generally speaking, such a program
will want to do the following:

1.  Call `validateObject` for each object. This just validates the object against schema.
2.  Call `indexObjects` on the array of validated objects. This produces a
    "database" that the next function will use.
3.  Call `validateNamespace` for each namespace produced by `indexObjects`.
    This performs more semantic validation, such as checking that foreign-key
    constraints are satisfied across objects, and ensuring that `Attribute`s
    belong to a `Struct` that actually exists.

There are several functions provided by this library in `source/Commands` that
are also exposed as Serverless functions that provide Core PreQL functionality.

Most of the documentation of this library is in the form of JSDoc comments and
the TypeScript types.

For documentation of the individual API Object kinds, drill into
`source/APIObjectKinds`, where you will find JSON schema, TypeScript interfaces,
and JSDoc comments. It may be quicker to view the test data at
`test/data/kubey.yaml`. The many Jest tests in `test/jest` may also be
instructive.

## Possible Future Features

- [ ] PreQL Log (In-database log of errors, warnings, etc.)
- [ ] `ReplicationSet` kind
- [ ] `VirtualAttribute` kind
- [ ] `Shard` kind
- [ ] `Sequence` kind
- [ ] `Event` kind
- [ ] `HASH` setter, or something else for hashing. (This would be _really_ useful for secure password storage.)
- [ ] `CONCAT` setter (Check if string begins or ends with something, and CONCAT if not present.)
- [x] ~~Add information about error codes in `getPreqlInfo`.~~ I don't know how to do this.
- [ ] Add `Promise` resolution and rejection value documentation when [this issue](https://github.com/jsdoc/jsdoc/issues/1467) is closed.
- [ ] Handle support or non-support for Unicode Characters
- [ ] Errors indicating when you are passing in the wrong datatype for non-Typescript use.
- [ ] Write a command for testing data types.
- [ ] JSONSchema titles and descriptions
- [ ] Document target requirements.
- [ ] Breaking changes
  - [ ] Git rid of `Preamble` and `Postamble`?
  - [ ] Use `urn:uuid:<uuid>` error codes instead of just UUIDs.
