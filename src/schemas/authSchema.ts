export const userSchema = {
    type: 'object',
    required: ['email', 'password', 'name'],
    properties: {
      id: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      name: { type: 'string' },
    },
  };
  