import { Client } from 'cassandra-driver';

const client = new Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'ecommerce',
});

export async function createProduct(product: any) {
  const query = 'INSERT INTO products (id, name, price) VALUES (uuid(), ?, ?)';
  await client.execute(query, [product.name, product.price], { prepare: true });
  return product;
}

export async function getProducts() {
  const query = 'SELECT * FROM products';
  const result = await client.execute(query);
  return result.rows;
}
