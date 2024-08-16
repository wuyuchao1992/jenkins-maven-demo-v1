To connect to MongoDB and delete data from a collection based on the collection name in a TypeScript setup using Cucumber and Playwright, follow these steps:

### 1. Install Required Packages
First, you need to install the MongoDB Node.js driver:

```bash
npm install mongodb
```

### 2. Create a MongoDB Utility Module

Create a `mongodb-utils.ts` file to handle the MongoDB connection and operations:

```typescript
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || 'your-mongodb-connection-string';
let client: MongoClient;

export const connectToDatabase = async () => {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client.db(process.env.DB_NAME || 'your-database-name');
};

export const deleteDataFromCollection = async (collectionName: string) => {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    const result = await collection.deleteMany({});
    return result;
};
```

### 3. Use the MongoDB Utility in Cucumber Steps

In your Cucumber step definitions, you can use the utility functions:

```typescript
import { Given } from '@cucumber/cucumber';
import { deleteDataFromCollection } from '../utils/mongodb-utils';

Given('I delete all data from the {string} collection', async (collectionName: string) => {
    const result = await deleteDataFromCollection(collectionName);
    console.log(`Deleted ${result.deletedCount} documents from the ${collectionName} collection`);
});
```

### 4. Set Up Environment Variables

Ensure your environment variables are correctly set up in a `.env` file or through your CI/CD pipeline:

```
MONGO_URI=mongodb://your-username:your-password@your-cluster-url/dbname
DB_NAME=your-database-name
```

### 5. Running the Tests

Now you can run your Cucumber tests, and when the `Given` step is executed, it will connect to MongoDB and delete all data from the specified collection.

This setup will allow you to connect to MongoDB, select the database, and delete all documents from a specified collection using TypeScript, Cucumber, and Playwright.