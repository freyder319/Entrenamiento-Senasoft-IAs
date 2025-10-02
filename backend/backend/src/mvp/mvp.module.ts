import { Module } from '@nestjs/common';
import { LlmController } from './mvp.controller';
import { LlmService } from './mvp.service';

@Module({
  controllers: [LlmController],
  providers: [LlmService],
})
export class MvpModule {}
