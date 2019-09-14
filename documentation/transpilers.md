# Requirements for Transpilers

Transpilers MUST:

- [ ] Never delete data directly.
  - Foreign Key delete or update actions doing this is fine.
- [ ] Never change data types of existing data in such a way as would corrupt data.
- [ ] Never do anything that could potentially misrepresent data.
- [ ] Escape PreQL data so that SQL injection, LDAP injection, and other
      injection attacks are not possible.

Transpilers SHOULD:

- [ ] Log an event whenever they cannot translate an API object into native DDL.
- [ ] Log an unsupported character set or collation.
- [ ] Expose a Serverless function.
