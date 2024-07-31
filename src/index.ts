import Fastify from 'fastify';
import authRoutes from './routes/authRoute';
import productRoutes from './routes/productRoute';
import { runKeyspace } from './plugins/scylla'
import registerJwt from './utils/jwt';

const fastify = Fastify({logger: true});

runKeyspace();
//registerJwt(fastify);

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})
//fastify.register(authRoutes, { prefix: '/api' });
//fastify.register(productRoutes, { prefix: '/api' });

fastify.listen({port: 3000}, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server listening on ${address}`);
});
