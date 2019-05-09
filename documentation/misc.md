# Miscellaneous Notes

According to
[this](https://stackoverflow.com/questions/36870972/using-before-insert-trigger-to-change-the-datatype-of-incoming-data-to-match-t),
you will not be able to use BEFORE INSERT triggers to change incoming data types.

[Trigger vs. Check Constraint](https://www.sqlservercentral.com/forums/topic/check-constraint-vs-trigger).

Using triggers suddenly appeals to me because you can set custom error messages, like so:

```sql
DELIMITER //
CREATE TRIGGER bi_user
  BEFORE INSERT ON user
  FOR EACH ROW
BEGIN
  IF NEW.email NOT LIKE '_%@_%.__%' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email field is not valid';
  END IF;
END; //
DELIMITER ;
```

[Constraints should be used, where possible](https://www.sqlshack.com/are-sql-server-database-triggers-evil/)

In Azure MariaDB, I had to set `log_bin_trust_function_creators` to `ON` to be
able to create triggers. This is a global variable, which means you need
escalated privileges to modify it.

If this were done directly in SQL, it would be done with this query:

```sql
set global log_bin_trust_function_creators = 1;
```