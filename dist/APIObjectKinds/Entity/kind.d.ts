import APIObjectKind from "../../Interfaces/APIObjectKind";
/**
 * An object in the real world that is represented by one or more `Struct`s.
 *
 * In a relational database, an `Entity` is virtually meaningless, because
 * relational databases only use structurally rigid tables of data that are
 * innately limited in their ability to describe real world objects alone,
 * but many Object-Relational Mapping (ORM) libraries have the ability to
 * transform these tables into more complex objects in memory or on disk,
 * which are often referred to as "entities." This API object kind describes
 * such entities.
 *
 * In document-oriented databases, this maps to a whole document, whereas
 * each subdocument is a `Struct`, and the document itself is indicated by
 * the `rootStruct` field of the `Entity` API object.
 *
 * @see /source/APIObjectKinds/Struct/kind.
 */
declare const kind: APIObjectKind;
export default kind;
//# sourceMappingURL=kind.d.ts.map