import { Client } from 'cassandra-driver';
import dotenv from 'dotenv';

dotenv.config(); 

export async function runKeyspace() {
    const cluster = new Client({
        contactPoints: [
            process.env.CONTACT_POINT_1 || '',
            process.env.CONTACT_POINT_2 || '',
            process.env.CONTACT_POINT_3 || ''
        ],
        localDataCenter: process.env.LOCAL_DATA_CENTER || '',
        credentials: {
            username: process.env.USERNAME || '',
            password: process.env.PASSWORD || ''
        },
    });

    const newKeyspace = (keyspaceName: string, rf: number) => `
        CREATE KEYSPACE IF NOT EXISTS ${keyspaceName}
        WITH replication = {'class': 'NetworkTopologyStrategy', 'replication_factor': ${rf}} 
        AND durable_writes = true;
    `;

    const createKeyspace = async () => {
        try {
            await cluster.execute(newKeyspace('eCommerceAPI', 3));
            console.log('Keyspace created successfully');
        } catch (error) {
            console.error('Error creating keyspace:', error);
        }
    };

    const createTables = async () => {
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS eCommerceAPI.users (
                id UUID PRIMARY KEY,
                name TEXT,
                email TEXT,
                password TEXT,
                created_at TIMESTAMP
            );
        `;

        const createProductsTable = `
            CREATE TABLE IF NOT EXISTS eCommerceAPI.products (
                id UUID PRIMARY KEY,
                name TEXT,
                description TEXT,
                price DECIMAL,
                created_at TIMESTAMP
            );
        `;
        

        try {
            await cluster.execute(createUsersTable);
            await cluster.execute(createProductsTable);
            console.log('Tables created successfully');
        } catch (error) {
            console.error('Error creating tables:', error);
        }
    };

    const addUser = async (name: string, email: string, password: string) => {
        const insertUserQuery = `
            INSERT INTO eCommerceAPI.users (id, name, email, password, created_at)
            VALUES (uuid(), ?, ?, ?, toTimestamp(now()));
        `;

        try {
           return await cluster.execute(insertUserQuery, [name, email, password], { prepare: true });
            //console.log('User added successfully');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const verifyUser = async (email: string) => {
        const selectUserQuery = `
            SELECT * FROM eCommerceAPI.users WHERE email = ?;
        `;

        try {
            const result = await cluster.execute(selectUserQuery, [email], { prepare: true });
            if (result.rowLength > 0) {
                console.log('User verified successfully:', result.rows[0]);
            } else {
                console.log('User not found');
            }
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };

    await createKeyspace();
    await createTables();
    const user = await addUser('John Doe', 'john.doe@example.com', 'securepassword');
    console.log({user});
    await verifyUser('john.doe@example.com');
    await cluster.shutdown();
}

runKeyspace();
