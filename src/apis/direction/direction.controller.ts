import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from "express";
import { DirectionService } from './direction.service';
import { DirectionQueryStrings } from './entities/direction.entity';

@Controller('direction')
export class DirectionController {
  constructor(private readonly directionService: DirectionService) { }

  @Get()
  find(@Query() queryStrings: DirectionQueryStrings, @Res() res: Response) {
    return this.directionService.findDirection(res, queryStrings);
  }
}
