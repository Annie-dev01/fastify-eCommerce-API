import { Client } from 'cassandra-driver';

const client = new Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'ecommerce',
});

export async function createUser(user: any) {
  const query = 'INSERT INTO users (id, username, password) VALUES (uuid(), ?, ?)';
  await client.execute(query, [user.username, user.password], { prepare: true });
  return user;
}

export async function authenticateUser(credentials: any) {
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  const result = await client.execute(query, [credentials.username, credentials.password], { prepare: true });
  return result.rowLength ? result.first() : null;
}
