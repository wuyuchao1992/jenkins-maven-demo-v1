import { Database } from './database';

const dbConfig = {
  user: 'your-username',
  host: 'your-host',
  database: 'your-database',
  password: 'your-password',
  port: 5432,
};

const database = new Database(dbConfig);

const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
  );
`;

const insertUsersQuery = `
  INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
  INSERT INTO users (name, email) VALUES ('Bob', 'bob@example.com');
`;

const selectUsersQuery = `
  SELECT * FROM users;
`;

async function run() {
  try {
    await database.connect();

    await database.executeQuery(createUserTableQuery);
    await database.executeQuery(insertUsersQuery);
    const result = await database.executeQuery(selectUsersQuery);

    console.log('Query Result:', result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
  } finally {
    await database.disconnect();
  }
}

run();
