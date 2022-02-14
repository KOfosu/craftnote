import { Test, TestingModule } from '@nestjs/testing';
import { getMockRes } from '@jest-mock/express'
import { DirectionService } from '../direction.service';
import { DirectionQueryStrings } from '../entities/direction.entity';
import DirectionValidator from '../direction.validator';
import DirectionManager from '../../../helpers/direction-manager';

describe('DirectionService', () => {
  let service: DirectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectionService, DirectionValidator, DirectionManager],
    }).compile();

    service = module.get<DirectionService>(DirectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be validate negative heading', () => {
    const params: DirectionQueryStrings = {
      heading: -310,
      target: -75
    }

    const { res } = getMockRes();

    const results = service.findDirection(res, params);
    expect(results.status).toBeCalledWith(400);
    expect(results.json).toBeCalledWith({ message: "Heading must be a positive number" });
  });

  it('should be validate negative target', () => {
    const params: DirectionQueryStrings = {
      heading: 310,
      target: -75
    }

    const { res } = getMockRes();

    const results = service.findDirection(res, params);
    expect(results.status).toBeCalledWith(400);
    expect(results.json).toBeCalledWith({ message: "Target must be a positive number" });
  });

  it('should get direction successfully', () => {
    const params: DirectionQueryStrings = {
      heading: 310,
      target: 75
    }

    const { res } = getMockRes();

    const results = service.findDirection(res, params);
    expect(results.status).toBeCalledWith(200);
    expect(results.json).toBeCalledWith({ direction: "right" });
  });
});
