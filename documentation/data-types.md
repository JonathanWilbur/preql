# Data Types

Generally, data types break down to one of these categories:

- Simple map (`boolean` => `BOOLEAN`, `inet` => `INET`)
- Size map (`sint8` => `TINYINT`, `sint15` => `MEDIUMINT`)

In each case, checkConstraints, getters, and setters may be present.

A `DataType` API Object Kind could look like this

```yaml
apiVersion: 1.0.0
kind: DataType
metadata:
  labels:
    name: coolguy
spec:
  simpleMap:
    mariadb:
      nativeType: VARCHAR(64)
      check:
        - "%s REGEXP '^jonathan$'"
    tsql:
      nativeType: NVARCHAR(64)
      check:
        - "%s LIKE 'jonathan'"
```