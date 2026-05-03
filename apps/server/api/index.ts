import { NestFactory } from '@nestjs/core';
import type { Request, Response } from 'express';

import { AppModule } from '../src/app.module';

let serverPromise: Promise<(req: Request, res: Response) => void> | null = null;
const corsOrigins = (process.env.CORS_ALLOW_ORIGINS ?? 'https://moneiet.vercel.app')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const corsOriginSet = new Set(corsOrigins);
type CorsCallback = (error: Error | null, allow?: boolean) => void;

async function getServer() {
  if (!serverPromise) {
    serverPromise = (async () => {
      const app = await NestFactory.create(AppModule);
      app.enableCors({
        origin: (origin: string | undefined, callback: CorsCallback) => {
          if (!origin || corsOriginSet.has(origin)) {
            callback(null, true);
            return;
          }

          callback(null, false);
        },
        credentials: true,
        optionsSuccessStatus: 200
      });
      await app.init();
      return app.getHttpAdapter().getInstance();
    })();
  }

  return serverPromise;
}

export default async function handler(req: Request, res: Response) {
  const server = await getServer();
  return server(req, res);
}
