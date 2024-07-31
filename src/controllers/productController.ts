import { FastifyReply, FastifyRequest } from 'fastify';
import { createProduct, getProducts } from '../services/productService';

export async function createProductHandler(request: FastifyRequest, reply: FastifyReply) {
  const product = await createProduct(request.body);
  reply.send(product);
}

export async function getProductsHandler(request: FastifyRequest, reply: FastifyReply) {
  const products = await getProducts();
  reply.send(products);
}
