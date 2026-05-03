import { Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { UserSecurityService } from './user-security.service';

@Controller()
export class SecurityController {
  constructor(private readonly userSecurityService: UserSecurityService) {}

  @Get('users/:userId/security')
  async getUserSecurity(@Param('userId') userId: string) {
    return this.userSecurityService.getState(userId);
  }

  @Post('users/:userId/security/failed-login')
  async recordFailedLogin(@Param('userId') userId: string) {
    return this.userSecurityService.recordFailedLogin(userId);
  }

  @Delete('users/:userId/security')
  async resetUserSecurity(@Param('userId') userId: string) {
    await this.userSecurityService.reset(userId);
    return { ok: true };
  }
}
