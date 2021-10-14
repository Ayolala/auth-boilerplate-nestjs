import { Test, TestingModule } from '@nestjs/testing';
import { KabaniConsumerService } from './kabani-consumer.service';

describe('KabaniConsumerService', () => {
  let service: KabaniConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KabaniConsumerService],
    }).compile();

    service = module.get<KabaniConsumerService>(KabaniConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
