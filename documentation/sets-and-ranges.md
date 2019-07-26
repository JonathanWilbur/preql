# Sets and Ranges

Sets and Ranges, such as those supported by Postgres, will not be supported
in PreQL, because the difficulty of implementation does not justify the
benefits of having these types. From what I can see, it appears that _only_
Postgres supports them. Ranges can be easily implemented as two time-like
columns, and sets can be implemented as an integral type, using bits as flags.