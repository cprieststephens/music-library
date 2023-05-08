const { Client } = require('pg');
const path = require('path');

const loadEnv = () => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV != 'production') {
    const envFile = '../.env.test';

    require('dotenv').config({
      path: path.join(__dirname, envFile),
    });

    // capture the name of the database so we can drop it
    const databaseName = process.env.PGDATABASE;

    // remove the name of the database from the environment, so pg doesn't try to connect to a db which doesn't exist yet
    delete process.env.PGDATABASE;

    return databaseName;
  }
};

const dropDatabase = async (databaseName) => {
  // create a new client, it will automatically load the connection details from process.env
  const client = new Client();
  try {
    await client.connect();

    console.log(`Destroying ${databaseName} database...`);

    await client.query(`DROP DATABASE ${databaseName} WITH (FORCE)`);

    console.log('Database destroyed!');
  } catch (err) {
    console.log(err);
  } finally {
    client.end();
  }
};

const databaseName = loadEnv();
dropDatabase(databaseName);
