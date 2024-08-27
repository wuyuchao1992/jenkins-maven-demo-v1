import { MongoClient, Filter } from 'mongodb';

const uri = process.env.MONGO_URI || 'your-mongodb-connection-string';
let client: MongoClient;

export const connectToDatabase = async () => {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client.db(process.env.DB_NAME || 'your-database-name');
};

/**
 * 删除集合中符合条件的数据
 * @param collectionName 集合的名称
 * @param filter 删除操作的条件
 * @returns 删除操作的结果
 */
export const deleteDataFromCollection = async (collectionName: string, filter: Filter<any> = {}) => {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    const result = await collection.deleteMany(filter);
    return result;
};