import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const port = Number(process.env.PORT ?? 8000);
const corsOrigins = (process.env.CORS_ALLOW_ORIGINS ?? 'https://moneiet.vercel.app')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const corsOriginSet = new Set(corsOrigins);
type CorsCallback = (error: Error | null, allow?: boolean) => void;

async function bootstrap() {
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
  await app.listen(port);
  console.log(`CORS allowed origins: ${corsOrigins.join(', ')}`);
  console.log(`\n  Server running on http://localhost:${port}\n`);
}
bootstrap();
