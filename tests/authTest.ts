import { expect } from 'chai';
import Fastify from 'fastify';
import authRoutes from '../src/routes/authRoute';
import registerJwt from '../src/utils/jwt';

const fastify = Fastify();
registerJwt(fastify);
fastify.register(authRoutes, { prefix: '/api' });

describe('Auth API', () => {
  it('should register a user', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/register',
      payload: { username: 'test', password: 'test' },
    });

    expect(response.statusCode).to.equal(200);
    const data = JSON.parse(response.payload);
    expect(data).to.have.property('token');
  });

  it('should login a user', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/login',
      payload: { username: 'test', password: 'test' },
    });

    expect(response.statusCode).to.equal(200);
    const data = JSON.parse(response.payload);
    expect(data).to.have.property('token');
  });
});
