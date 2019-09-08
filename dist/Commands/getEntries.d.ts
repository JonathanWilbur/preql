import APIObjectDatabase from "../Interfaces/APIObjectDatabase";
export default function getEntries(namespace: APIObjectDatabase): Promise<{
    entries: Record<string, Record<string, object[]>>;
}>;
//# sourceMappingURL=getEntries.d.ts.map