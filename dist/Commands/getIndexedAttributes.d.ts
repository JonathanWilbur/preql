import APIObjectDatabase from '../Interfaces/APIObjectDatabase';
export default function getIndexedAttributes(namespace: APIObjectDatabase): Promise<{
    attributes: Record<string, boolean>;
}>;
