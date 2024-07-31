import { expect } from 'chai';
import Fastify from 'fastify';
import productRoutes from '../src/routes/productRoute';
import registerJwt from '../src/utils/auth';

const fastify = Fastify();
registerJwt(fastify);
fastify.register(productRoutes, { prefix: '/api' });

describe('Product API', () => {
  let token: string;

  before(async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/login',
      payload: { username: 'test', password: 'test' },
    });

    const data = JSON.parse(response.payload);
    token = data.token;
  });

  it('should create a product', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/products',
      headers: { Authorization: `Bearer ${token}` },
      payload: { name: 'product1', price: 100 },
    });

    expect(response.statusCode).to.equal(200);
    const data = JSON.parse(response.payload);
    expect(data).to.have.property('name', 'product1');
  });

  it('should get products', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/products',
    });

    expect(response.statusCode).to.equal(200);
    const data = JSON.parse(response.payload);
    expect(data).to.be.an('array');
  });
});
