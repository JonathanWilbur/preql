import APIObjectKind from "../../Interfaces/APIObjectKind";
/**
 * Represents a special kind of `Attribute` that "points" to another
 * another `Struct`. It "points" to this other `Struct` by having the same
 * value as a corresponding `Attribute` in the other `Struct`. Many relational
 * databases automatically enforce these constraints by requiring the
 * `ForeignKey` to point to at least one `Struct`, and preventing the deletion
 * of `Struct`s to which `ForeignKey`s point. In document-oriented databases,
 * `ForeignKey`s are less common, since documents are usually expected to be
 * self-contained.
 *
 * In PreQL, you may not choose the data type of the `ForeignKey`. It is
 * selected for you automatically, because, usually, every DBMS has a
 * data type that is obvious superior for use as a `ForeignKey`. In most
 * relational databases, this will typically be some sort of integer.
 *
 * In document-oriented databases, the effect of `ForeignKey`s is to make
 * their `Struct`s "subdocuments" of another `Struct` within the same
 * `Entity`.
 */
declare const kind: APIObjectKind;
export default kind;
//# sourceMappingURL=kind.d.ts.map