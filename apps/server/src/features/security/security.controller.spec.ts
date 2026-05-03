import { Test, TestingModule } from '@nestjs/testing';

import { SecurityController } from './security.controller';
import { UserSecurityService } from './user-security.service';

describe('SecurityController', () => {
  let securityController: SecurityController;
  const userSecurityService = {
    getState: jest.fn(),
    recordFailedLogin: jest.fn(),
    reset: jest.fn()
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SecurityController],
      providers: [
        {
          provide: UserSecurityService,
          useValue: userSecurityService
        }
      ]
    }).compile();

    securityController = app.get<SecurityController>(SecurityController);
  });

  it('returns stored security state for a user', async () => {
    userSecurityService.getState.mockResolvedValue({
      failedLoginAttempts: 2,
      lastFailedLoginAt: '2026-05-03T00:00:00.000Z',
      lockedUntil: null
    });

    await expect(securityController.getUserSecurity('123')).resolves.toEqual({
      failedLoginAttempts: 2,
      lastFailedLoginAt: '2026-05-03T00:00:00.000Z',
      lockedUntil: null
    });
    expect(userSecurityService.getState).toHaveBeenCalledWith('123');
  });

  it('records a failed login and returns the updated state', async () => {
    userSecurityService.recordFailedLogin.mockResolvedValue({
      failedLoginAttempts: 1,
      lastFailedLoginAt: '2026-05-03T00:00:00.000Z',
      lockedUntil: null
    });

    await expect(securityController.recordFailedLogin('123')).resolves.toEqual({
      failedLoginAttempts: 1,
      lastFailedLoginAt: '2026-05-03T00:00:00.000Z',
      lockedUntil: null
    });
    expect(userSecurityService.recordFailedLogin).toHaveBeenCalledWith('123');
  });

  it('clears security state for a user', async () => {
    userSecurityService.reset.mockResolvedValue(undefined);

    await expect(securityController.resetUserSecurity('123')).resolves.toEqual({ ok: true });
    expect(userSecurityService.reset).toHaveBeenCalledWith('123');
  });
});
