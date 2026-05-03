import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../../infra/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    const result = await this.databaseService.query('SELECT * FROM "user"');
    return result.rows;
  }
}
