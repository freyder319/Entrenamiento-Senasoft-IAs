import { Test, TestingModule } from '@nestjs/testing';
import { LlmService } from './mvp.service';

describe('MvpController', () => {
  let controller: LlmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LlmService],
    }).compile();

    controller = module.get<LlmService>(LlmService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
