import { Injectable } from "@nestjs/common";
import { DirectionQueryStrings } from "./entities/direction.entity";
import * as joi from "joi";
import JoiValidator from "../../utils/joi-validator";

@Injectable()
export default class DirectionValidator {
  validateQueryStrings(params: DirectionQueryStrings): string | null {
    // validate the params 
    const joiSchema = joi.object({
      heading: joi.number().positive().required().label('Heading'),
      target: joi.number().positive().required().label('Target'),
    });

    const joiValidationResults = JoiValidator.validate(joiSchema, params);

    // return results of validation
    return joiValidationResults;
  }
}