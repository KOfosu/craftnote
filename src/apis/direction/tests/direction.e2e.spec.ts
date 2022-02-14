import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { DirectionModule } from '../direction.module';

describe('E2E TESTS FOR DIRECTIONS', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DirectionModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('GET /direction', () => {
    it('should be validate required heading', async () => {
      const params = {
        target: 75
      }

      const response = await supertest(app.getHttpServer()).get('/direction').query(params);

      expect(response.status).toEqual(400);
      expect(response.body).toBeDefined();
      expect(response.body.message).toEqual('Heading is required');
    });

    it('should be validate required target', async () => {
      const params = {
        heading: 310,
      }

      const response = await supertest(app.getHttpServer()).get('/direction').query(params);

      expect(response.status).toEqual(400);
      expect(response.body).toBeDefined();
      expect(response.body.message).toEqual('Target is required');
    });

    it('should be validate invalid heading', async () => {
      const params = {
        heading: "310s",
        target: 75
      }

      const response = await supertest(app.getHttpServer()).get('/direction').query(params);

      expect(response.status).toEqual(400);
      expect(response.body).toBeDefined();
      expect(response.body.message).toEqual('Heading must be a number');
    });

    it('should be validate invalid target', async () => {
      const params = {
        heading: 310,
        target: "75s"
      }

      const response = await supertest(app.getHttpServer()).get('/direction').query(params);

      expect(response.status).toEqual(400);
      expect(response.body).toBeDefined();
      expect(response.body.message).toEqual('Target must be a number');
    });

    it('should be validate negative heading', async () => {
      const params = {
        heading: -310,
        target: -75
      }

      const response = await supertest(app.getHttpServer()).get('/direction').query(params);

      expect(response.status).toEqual(400);
      expect(response.body).toBeDefined();
      expect(response.body.message).toEqual('Heading must be a positive number');
    });

    it('should be validate negative target', async () => {
      const params = {
        heading: 310,
        target: -75
      }

      const response = await supertest(app.getHttpServer()).get('/direction').query(params);

      expect(response.status).toEqual(400);
      expect(response.body).toBeDefined();
      expect(response.body.message).toEqual('Target must be a positive number');
    });

    it('should get direction successfully', async () => {
      const params = {
        heading: 310,
        target: 75
      }

      const response = await supertest(app.getHttpServer()).get('/direction').query(params);

      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
      expect(response.body.direction).toEqual('right');
    });
  })
});
