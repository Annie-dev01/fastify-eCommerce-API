// fastify-jwt module
declare module 'fastify-jwt' {
    import { FastifyPluginCallback, FastifyRequest, FastifyReply } from 'fastify';
  
    interface FastifyJwtOptions {
      secret: string;
      sign?: any;
      verify?: any;
    }
  
    const fastifyJwt: FastifyPluginCallback<FastifyJwtOptions>;
    export default fastifyJwt;
  }