import { Module } from '@nestjs/common';

import { SecurityController } from './security.controller';
import { UserSecurityService } from './user-security.service';
import { RedisModule } from '../../infra/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [SecurityController],
  providers: [UserSecurityService]
})
export class SecurityModule {}
