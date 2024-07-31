export const productSchema = {
    type: 'object',
    required: ['name', 'price', 'description'],
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      price: { type: 'number' },
      description: { type: 'string' },
    },
  };
  