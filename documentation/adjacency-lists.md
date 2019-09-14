# Adjacency Lists with PreQL

Adjacency lists can be created easily using the `spec.layer` field in `Entry`
objects. When using the `layer` field, `Entry`s will be inserted in order of
increasing `layer` so that foreign key constraints are not violated as the
hierarchy is built.

```yaml
apiVersion: preql/1.0.0
kind: Entry
metadata:
  name: fruit
spec:
  databaseName: floofy
  structName: foodCategory
  id: 1
  layer: 0
  values:
    name: fruit
---
apiVersion: preql/1.0.0
kind: Entry
metadata:
  name: vegetable
spec:
  databaseName: floofy
  structName: foodCategory
  id: 2
  layer: 0
  values:
    name: vegetable
---
apiVersion: preql/1.0.0
kind: Entry
metadata:
  name: apple
spec:
  databaseName: floofy
  structName: foodCategory
  id: 3
  layer: 1
  values:
    name: apple
    parent: 1
---
apiVersion: preql/1.0.0
kind: Entry
metadata:
  name: orange
spec:
  databaseName: floofy
  structName: foodCategory
  id: 4
  layer: 1
  values:
    name: orange
    parent: 1
---
apiVersion: preql/1.0.0
kind: Entry
metadata:
  name: broccoli
spec:
  databaseName: floofy
  structName: foodCategory
  id: 5
  layer: 1
  values:
    name: broccoli
    parent: 2
---
apiVersion: preql/1.0.0
kind: Entry
metadata:
  name: celery
spec:
  databaseName: floofy
  structName: foodCategory
  id: 6
  layer: 1
  values:
    name: celery
    parent: 2
```

Will create this adjacency list in an RDBMS:

| id | name      | parent |
| ---|-----------|--------|
| 1  | fruit     | NULL   |
| 2  | vegetable | NULL   |
| 3  | apple     | 1      |
| 4  | orange    | 1      |
| 5  | broccoli  | 2      |
| 6  | celery    | 2      |

Which, when represented hierarchically, looks like this:

- fruit
  - apple
  - orange
- vegetable
  - broccoli
  - celery

Again, `fruit` and `vegetable` will be inserted before anything else, because
`layer` is `0` for them.
