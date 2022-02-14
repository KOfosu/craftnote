import { Module } from '@nestjs/common';
import { DirectionModule } from './apis/direction/direction.module';

@Module({
  imports: [DirectionModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
