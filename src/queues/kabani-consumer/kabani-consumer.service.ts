import { Processor } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';

@Processor('kabani')
export class KabaniConsumerService {

  constructor(
  private readonly configService: ConfigService,
  ) {}

}
