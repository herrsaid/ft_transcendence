import { Test, TestingModule } from '@nestjs/testing';
import { WebsockGateway } from './websock.gateway';

describe('WebsockGateway', () => {
  let gateway: WebsockGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsockGateway],
    }).compile();

    gateway = module.get<WebsockGateway>(WebsockGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
