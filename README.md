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
- Never modify `Attribute` or `Struct` names unless absolutely necessary.
  - This means no converting `CamelCase` into `snake_case` and vice versa, for instance.

The above will be _required_ for inclusion in the official CLI. (Except using `NullLogger`.)

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

## After 1.0.0

- [ ] JSDoc documentation on everything
- [ ] JSONSchema titles and descriptions
- [ ] Automated testing
- [ ] Webpack / Compressed builds
- [ ] Makefile
- [ ] Bazel builds?
- [ ] Use the `files` attribute in `package.json`
- [ ] `package.json` tests

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