import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signUp request', () => {
    const userEmail = "tes345345345t@gmail.com"
    return request(app.getHttpServer())
      .post('/auth')
      .send(
        {
            email: userEmail,
            password: "123"
        }
      )
      .expect(201)
      .then((res) => {
        const { id, email } = res.body ?? {}
        expect(id).toBeDefined();
        expect(email).toEqual(userEmail)

      });
  });
});
