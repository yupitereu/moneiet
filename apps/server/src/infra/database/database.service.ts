import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, type PoolConfig, type QueryResult, type QueryResultRow } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  constructor(private readonly configService: ConfigService) {}

  private pool: Pool | null = null;

  private getConnectionString() {
    return this.configService.get<string>('DATABASE_URL')?.trim() ?? process.env.DATABASE_URL?.trim();
  }

  private createPool() {
    const connectionString = this.getConnectionString();
    if (!connectionString) {
      return null;
    }

    const poolConfig: PoolConfig = {
      connectionString
    };

    const pool = new Pool(poolConfig);
    pool.on('error', (error: Error) => {
      this.logger.error('Unexpected PostgreSQL pool error', error.stack);
    });

    return pool;
  }

  private getPool() {
    if (!this.pool) {
      this.pool = this.createPool();
    }

    return this.pool;
  }

  isConfigured() {
    return Boolean(this.getConnectionString());
  }

  async query<T extends QueryResultRow = QueryResultRow>(text: string, values?: unknown[]): Promise<QueryResult<T>> {
    const pool = this.getPool();
    if (!pool) {
      throw new Error('DATABASE_URL is not configured.');
    }

    return pool.query<T>(text, values);
  }

  async ping() {
    await this.query('SELECT 1');
    return true;
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }
}
