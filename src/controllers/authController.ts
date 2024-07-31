import { FastifyReply, FastifyRequest } from 'fastify';
import { createUser, authenticateUser } from '../services/authService';

export async function register(this: any, request: FastifyRequest, reply: FastifyReply) {
  const user = await createUser(request.body);
  const token = this.jwt.sign({ id: user.id });
  reply.send({ token });
}

export async function login(this: any, request: FastifyRequest, reply: FastifyReply) {
  const user = await authenticateUser(request.body);
  if (user) {
    const token = this.jwt.sign({ id: user.id });
    reply.send({ token });
  } else {
    reply.status(401).send({ message: 'Invalid credentials' });
  }
}
