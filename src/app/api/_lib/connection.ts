import { MongoClient } from "mongodb";

const uri: string | undefined = process.env.MONGODB_URL; // Set this in your .env file
const options = {};

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

let client: MongoClient = new MongoClient(uri, options);
let clientPromise: Promise<MongoClient> = client.connect();

export default clientPromise;
