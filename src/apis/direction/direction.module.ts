import { Module } from '@nestjs/common';
import { DirectionService } from './direction.service';
import { DirectionController } from './direction.controller';
import DirectionValidator from './direction.validator';
import DirectionManager from '../../helpers/direction-manager';

@Module({
  controllers: [DirectionController],
  providers: [DirectionService, DirectionValidator, DirectionManager]
})
export class DirectionModule { }
