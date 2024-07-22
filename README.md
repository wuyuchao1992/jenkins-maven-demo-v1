import { Client } from 'pg';

interface DbConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

class Database {
  private config: DbConfig;

  constructor(config: DbConfig) {
    this.config = config;
  }

  async executeQuery(query: string): Promise<any> {
    const client = new Client(this.config);
    try {
      await client.connect();
      await client.query('BEGIN');
      const result = await client.query(query);
      await client.query('COMMIT');
      return result;
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Transaction error:', err.stack);
      throw err;
    } finally {
      await client.end();
    }
  }
}

// 使用示例
const dbConfig: DbConfig = {
  user: 'your-username',
  host: 'your-host',
  database: 'your-database',
  password: 'your-password',
  port: 5432,
};

const database = new Database(dbConfig);

const multiLineQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
  );

  INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
  INSERT INTO users (name, email) VALUES ('Bob', 'bob@example.com');

  SELECT * FROM users;
`;

database.executeQuery(multiLineQuery)
  .then((result) => {
    console.log('Query Result:', result.rows);
  })
  .catch((err) => {
    console.error('Error executing query:', err);
  });
