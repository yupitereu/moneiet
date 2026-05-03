import { Injectable } from '@nestjs/common';

import { RedisService } from '../../infra/redis/redis.service';

export type UserSecurityState = {
  failedLoginAttempts: number;
  lastFailedLoginAt: string | null;
  lockedUntil: string | null;
};

const SECURITY_STATE_TTL_SECONDS = 60 * 60 * 24;
const SECURITY_LOCK_THRESHOLD = 5;
const SECURITY_LOCK_DURATION_MS = 15 * 60 * 1000;

@Injectable()
export class UserSecurityService {
  constructor(private readonly redisService: RedisService) {}

  private getKey(userId: string) {
    return `user-security:${userId}`;
  }

  async getState(userId: string): Promise<UserSecurityState> {
    const state = await this.redisService.getJson<UserSecurityState>(this.getKey(userId));
    return (
      state ?? {
        failedLoginAttempts: 0,
        lastFailedLoginAt: null,
        lockedUntil: null
      }
    );
  }

  async recordFailedLogin(userId: string) {
    const currentState = await this.getState(userId);
    const now = new Date();
    const nextState: UserSecurityState = {
      failedLoginAttempts: currentState.failedLoginAttempts + 1,
      lastFailedLoginAt: now.toISOString(),
      lockedUntil:
        currentState.failedLoginAttempts + 1 >= SECURITY_LOCK_THRESHOLD
          ? new Date(now.getTime() + SECURITY_LOCK_DURATION_MS).toISOString()
          : currentState.lockedUntil
    };

    await this.redisService.setJson(this.getKey(userId), nextState, SECURITY_STATE_TTL_SECONDS);
    return nextState;
  }

  async reset(userId: string) {
    await this.redisService.delete(this.getKey(userId));
  }
}
