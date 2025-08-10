import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGO_URI || 'mongodb+srv://Tayo:lBkyKVmpTgavVAGA@studi.zmt6wvt.mongodb.net/studi';

const client = new MongoClient(uri);
await client.connect();

export { client };
