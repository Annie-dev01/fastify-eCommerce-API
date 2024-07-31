
import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

  // cassandra-driver module
  declare module 'cassandra-driver' {
    export class Client {
      constructor(options: {
        contactPoints: string[],
        localDataCenter: string,
        keyspace?: string,
      });
  
      execute(query: string, params?: any[], options?: { prepare: boolean }): Promise<any>;
    }
  }
  
  
  