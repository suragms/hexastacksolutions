import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

function getUri(): string {
    const uri = process.env.DATABASE_URL;
    if (!uri || !uri.trim()) {
        throw new Error('DATABASE_URL is not set. Add it in Vercel/Netlify Environment Variables.');
    }
    return uri;
}

let client: MongoClient | null = null;
let dbInstance: any = null;

export async function getCollection(name: string) {
    if (!dbInstance) {
        const uri = getUri();
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        await client.connect();
        dbInstance = client.db();
    }
    return dbInstance.collection(name);
}

export { ObjectId };
