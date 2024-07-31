import fastifyJwt from 'fastify-jwt';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export default function registerJwt(fastify: FastifyInstance) {
  fastify.register(fastifyJwt, {
    secret: 'your-secret-key',
  });

  fastify.decorate('authenticate', async function (request: any, reply: any) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
}
