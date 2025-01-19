import { MongoClient } from "mongodb";

const uri: string | undefined = process.env.MONGODB_URL; // Set this in your .env file
const options = {};

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const client: MongoClient = new MongoClient(uri, options);
const clientPromise: Promise<MongoClient> = client.connect();

export default clientPromise;
