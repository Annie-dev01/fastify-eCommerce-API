import { FastifyInstance } from 'fastify';
import { createProductHandler, getProductsHandler } from '../controllers/productController';

export default async function productRoutes(fastify: FastifyInstance) {
  fastify.post('/products', { preHandler: [fastify.authenticate] }, createProductHandler);
  fastify.get('/products', getProductsHandler);
}
