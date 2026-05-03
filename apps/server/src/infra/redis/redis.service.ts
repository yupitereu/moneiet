import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from '@upstash/redis';

type RedisCredentials = {
  url?: string;
  token?: string;
};

@Injectable()
export class RedisService {
  constructor(private readonly configService: ConfigService) {}

  private client: Redis | null = null;

  private getCredentials(): RedisCredentials {
    const url =
      this.configService.get<string>('KV_REST_API_URL')?.trim() ??
      this.configService.get<string>('UPSTASH_REDIS_REST_URL')?.trim() ??
      process.env.KV_REST_API_URL?.trim() ??
      process.env.UPSTASH_REDIS_REST_URL?.trim();

    const token =
      this.configService.get<string>('KV_REST_API_TOKEN')?.trim() ??
      this.configService.get<string>('UPSTASH_REDIS_REST_TOKEN')?.trim() ??
      process.env.KV_REST_API_TOKEN?.trim() ??
      process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

    return { url, token };
  }

  private createClient() {
    const { url, token } = this.getCredentials();
    if (!url || !token) {
      return null;
    }

    return new Redis({ url, token });
  }

  private getClient() {
    if (!this.client) {
      this.client = this.createClient();
    }

    return this.client;
  }

  isConfigured() {
    const { url, token } = this.getCredentials();
    return Boolean(url && token);
  }

  async ping() {
    const client = this.getClient();
    if (!client) {
      throw new Error('Upstash Redis is not configured.');
    }

    await client.ping();
    return true;
  }

  async getJson<T>(key: string): Promise<T | null> {
    const client = this.getClient();
    if (!client) {
      throw new Error('Upstash Redis is not configured.');
    }

    return client.get<T>(key);
  }

  async setJson<T>(key: string, value: T, ttlSeconds?: number) {
    const client = this.getClient();
    if (!client) {
      throw new Error('Upstash Redis is not configured.');
    }

    await client.set(key, value);
    if (ttlSeconds) {
      await client.expire(key, ttlSeconds);
    }
  }

  async delete(key: string) {
    const client = this.getClient();
    if (!client) {
      throw new Error('Upstash Redis is not configured.');
    }

    await client.del(key);
  }
}
