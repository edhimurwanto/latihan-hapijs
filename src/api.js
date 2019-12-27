import Hapi from '@hapi/hapi';
import configure from './config';
import routes from './routes';
import createDbConnection from './db/connection';
import validate from '../src/config/auth.validate';

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

export default async () => {
  configure();
  const connection = await createDbConnection();
  const server = Hapi.server({
    port: process.env.APP_PORT,
    host: process.env.APP_HOST,
  });

  await server.register(require('@hapi/basic'));

  server.auth.strategy('simple', 'basic', { validate });

  server.route(routes);

  if (connection.isConnected) {
      
    await server.start();
    console.log(`Database connection name ${connection.name}.`);
    console.log(`Server ${process.env.APP_NAME}, running on ${server.info.uri}`);
  }

  return server.listener;
};
