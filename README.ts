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
 * 根据条件查询数据，并最多重试3次
 * @param collectionName 集合的名称
 * @param filter 查询条件
 * @returns 查询到的数据，如果在3次查询后仍无数据，则返回 null
 */
export const findDataWithRetries = async (collectionName: string, filter: Filter<any>) => {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);

    let attempts = 0;
    let data = null;

    // 循环查询最多3次
    while (attempts < 3) {
        attempts += 1;
        console.log(`Attempt ${attempts}: Querying data with filter`, filter);

        data = await collection.findOne(filter);

        // 如果查询到数据，则跳出循环
        if (data) {
            console.log('Data found:', data);
            break;
        }

        // 如果没有数据，等待一段时间再进行下一次查询
        console.log('No data found, retrying...');
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 等待1秒钟再重试
    }

    // 如果3次查询后仍无数据，返回 null
    if (!data) {
        console.log('No data found after 3 attempts.');
    }

    return data;
};
