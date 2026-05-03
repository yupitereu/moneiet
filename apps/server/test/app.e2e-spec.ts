import path from 'node:path';
import fs from 'node:fs';

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import { DatabaseService } from '../src/infra/database/database.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let databaseService: DatabaseService;
  const userName = `Alice-${Date.now()}`;

  function loadDatabaseUrl() {
    const appRoot = path.resolve(__dirname, '..');
    for (const envFile of ['.env', '.env.local']) {
      const envPath = path.resolve(appRoot, envFile);
      if (!fs.existsSync(envPath)) {
        continue;
      }

      const match = fs
        .readFileSync(envPath, 'utf8')
        .match(/^\s*DATABASE_URL\s*=\s*(.+?)\s*$/m);

      if (match?.[1]) {
        process.env.DATABASE_URL = match[1];
      }
    }
  }

  beforeAll(async () => {
    loadDatabaseUrl();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    databaseService = app.get(DatabaseService);

    if (!databaseService.isConfigured()) {
      throw new Error('DATABASE_URL is not configured for e2e tests.');
    }

    await databaseService.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      )
    `);
    await databaseService.query('TRUNCATE TABLE "user" RESTART IDENTITY');
    await databaseService.query('INSERT INTO "user" (name) VALUES ($1)', [userName]);
  });

  afterAll(async () => {
    if (databaseService?.isConfigured()) {
      await databaseService.query('TRUNCATE TABLE "user" RESTART IDENTITY');
    }
    if (app) {
      await app.close();
    }
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([expect.objectContaining({ name: userName })])
        );
      });
  });
});
