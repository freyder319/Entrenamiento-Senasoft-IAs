import { Module } from '@nestjs/common';
import { MvpModule } from './mvp/mvp.module';
@Module({
  imports: [MvpModule],
})
export class AppModule {}
