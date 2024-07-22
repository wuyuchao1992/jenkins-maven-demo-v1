import { Client, ClientConfig } from 'pg';

interface DbConfig extends ClientConfig {}

export class Database {
  private config: DbConfig;
  private client: Client | null;

  constructor(config: DbConfig) {
    this.config = config;
    this.client = null;
  }

  // 连接数据库
  async connect(): Promise<void> {
    if (this.client) {
      console.warn('Already connected to the database');
      return;
    }

    this.client = new Client(this.config);
    await this.client.connect();
    console.log('Connected to the database');
  }

  // 断开数据库连接
  async disconnect(): Promise<void> {
    if (!this.client) {
      console.warn('Not connected to the database');
      return;
    }

    await this.client.end();
    this.client = null;
    console.log('Disconnected from the database');
  }

  // 执行SQL查询
  async executeQuery(query: string): Promise<any> {
    if (!this.client) {
      throw new Error('Database not connected');
    }

    try {
      await this.client.query('BEGIN');
      const result = await this.client.query(query);
      await this.client.query('COMMIT');
      return result;
    } catch (err) {
      await this.client.query('ROLLBACK');
      console.error('Transaction error:', err.stack);
      throw err;
    }
  }
}
