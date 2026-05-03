import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  const usersService = {
    findAll: jest.fn()
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService
        }
      ]
    }).compile();

    usersController = app.get<UsersController>(UsersController);
  });

  it('returns rows from the user table', async () => {
    usersService.findAll.mockResolvedValue([{ id: 1, name: 'Alice' }]);

    await expect(usersController.findAll()).resolves.toEqual([{ id: 1, name: 'Alice' }]);
    expect(usersService.findAll).toHaveBeenCalledTimes(1);
  });
});
