import { Test, TestingModule } from '@nestjs/testing';
import { GroupusersService } from './groupusers.service';

describe('GroupusersService', () => {
  let service: GroupusersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupusersService],
    }).compile();

    service = module.get<GroupusersService>(GroupusersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
