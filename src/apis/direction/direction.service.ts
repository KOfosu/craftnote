import { Injectable } from '@nestjs/common';
import { Response } from "express";
import { DirectionQueryStrings } from './entities/direction.entity';
import Responses from '../../common/responses';
import DirectionManager from '../../helpers/direction-manager';
import DirectionValidator from './direction.validator';


@Injectable()
export class DirectionService {
  constructor(
    private readonly directionValidator: DirectionValidator,
    private readonly directionManager: DirectionManager
  ) { }

  findDirection(res: Response, params: DirectionQueryStrings): any {
    // validate query strings and values passed to make sure they are correct and have expected types
    const validationResults = this.directionValidator.validateQueryStrings(params);

    if (validationResults) {
      return Responses.badRequest(res, validationResults);
    }

    // find the direction
    const direction = this.directionManager.getDirection(params.heading, params.target)

    // success
    return Responses.success(res, { direction });
  }
}
