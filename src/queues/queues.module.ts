import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { KabaniConsumerService } from './kabani-consumer/kabani-consumer.service';
import { ServicesModule } from '../services';
import { UserModule } from '../api/user';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'kabani',
    }),
    ServicesModule,
    UserModule,
  ],
  providers: [KabaniConsumerService],
  exports: [BullModule],
})
export class QueuesModule {}
