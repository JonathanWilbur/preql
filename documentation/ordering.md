# Ordering of operations

The SQL samples below are meant to be MariaDB / MySQL dialect, but
this is not rigidly followed.

The methodology used below is chosen to enable the generated scripts
to be run multiple times and bring tables up to a desired state,
regardless of whether or not they already exist.

1. If no primary key is specified, create a stub table:

```sql
CREATE TABLE IF NOT EXISTS friends (
    `id` SERIAL PRIMARY KEY
);
```

Otherwise, create a stub table with a placeholder column:

```sql
CREATE TABLE IF NOT EXISTS friends (
    `__placeholder__` BOOLEAN
);
```

2. Add columns one by one:

Note: I am worried about the performance characteristics of this.

```sql
ALTER TABLE friends
ADD COLUMN IF NOT EXISTS `firstName` VARCHAR(64);
```

3. Remove the placeholder:

```sql
ALTER TABLE friends
DROP COLUMN IF EXISTS `__placeholder__`;
```

4. Apply primary key constraints.
5. Apply foreign key constraints.
6. Apply check constraints.
7. Create indexes.
8. Create views.
9. Create users.
10. Create roles.
11. Add entries.