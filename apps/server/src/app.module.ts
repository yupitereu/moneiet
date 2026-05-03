import path from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityModule } from './features/security/security.module';
import { UsersModule } from './features/users/users.module';

const appRoot = process.cwd();
const envFilePath = [path.resolve(appRoot, '.env.local'), path.resolve(appRoot, '.env')];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath
    }),
    UsersModule,
    SecurityModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
