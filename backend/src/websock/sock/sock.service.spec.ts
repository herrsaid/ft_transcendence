import { Test, TestingModule } from '@nestjs/testing';
import { SockService } from './sock.service';

describe('SockService', () => {
  let service: SockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SockService],
    }).compile();

    service = module.get<SockService>(SockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
