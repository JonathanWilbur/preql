# Setters

"Setters" is synonymous with "trigger" in relational databases. I just call
them "setters" because it is more technology-neutral terminology.

Here are the ways that setters _could_ be used:

1. To validate data prior to insertion or update.
2. To normalize data prior to insertion or update.
3. To update some other data based on the inserted or updated data.

Use case #1 is not supported by PreQL by design. Setters generally should
not be used to check data prior to insertion, and reject it if it is invalid;
this is for `check` to do, which gets transpiled to `CHECK` statements in
most RDBMSs. The use of triggers in relational databases--to which setters
transpile--are far less performant than check statements. Every new row that
gets inserted initiates the trigger. Check statements, on the other hand,
are only run when the column (attribute in PreQL) is modified.

Use case #2 _is_ supported by PreQL, and it is currently the only expected
use case for setters that are expected to be supported by PreQL.
Setters in PreQL are primarily used for _normalizing_ data prior to insertion.
This allows database clients to insert, say, people names with lowercase
characters, and the database will normalize those names prior to insertion by
converting them to uppercase.

Use case #3 is not supported by PreQL mostly because of the difficulty of
implementation. How would you write an expression in PreQL that evaluates to
the new value of a column in every DBMS? I would also consider it a bad
practice to have "side-effects" associated with insertions and modifications.

Setters / triggers are generally to be avoided, unless truly necessary because
of their adverse impact to database performance and because their usage can
make databases less modular. In fact, it is perfectly acceptable for a target
transpiler to _not transpile them at all_ if the target dialect does not
support triggers.

That said, PreQL offers a very constrained list of setters that can be used
in a data type. The list of available setters are:

1. trim
2. substring
3. replace
4. case
5. pad

Each one takes an object containing arguments as a value. This object may be
empty. Each can occur only once, and MUST be applied in the order shown
above (e.g. `trim` before `substring`, then `substring` before `replace`,
etc.).

## Why are setters associated with data types instead of attributes?

This makes it easy to scale up. It would be cumbersome to attach setters
to attributes individually, and usually, the type of data you are using
correlates strongly with how you would want to normalize it. For instance,
it is unlikely that you would want one `MacAddress` type in one part of
your database to use uppercase hexadecimal letters and another `MacAddress`
to use lowercase hexadecimal letters. It would be stupid to have to copy
and paste the setters across all `MacAddress` attributes.

## Is it possible to screw up other data?

Test:

1. Create a table.
2. Create a trigger to normalize one NULL column.
3. Add an entry.
4. Update a different column to see if the original column gets set to NULL.

I found from experimentation with MariaDB that this did not happen.