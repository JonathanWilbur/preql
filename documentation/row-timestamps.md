# How to create a row timestamp

PreQL lets you create your own data types. To create attributes that update
automatically with the current timestamp, such as a `createTime` or
`updateTime` column in a relational database, create a data type with the
following characteristics:

1. A date, datetime, time, or timestamp-like data type.
2. `setters` containing `now: {}`. This makes the target transpiler transpile
   a trigger that sets the column to the current time upon creating or
   updating.

Do not set `default` on the `Attribute` to `NOW()`, or a similar function,
because not all targets support them.