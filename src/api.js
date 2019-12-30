import Hapi from '@hapi/hapi';
import Config from './config';
import routes from './routes';
import createDbConnection from './db/connection';
import getPlugins from './plugins';

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

export default async () => {
  const config = new Config();
  config.configure();

  const connection = await createDbConnection();
  const server = Hapi.server(config.getServerConfig());

  if (connection.isConnected) {

    const plugins = getPlugins({
      authPlugin: config.getAuthConfig(),
      basicAuthPlugin: config.getAuthConfig(),
    });

    await server.register(plugins);

    server.route(routes);

    await server.start();
    console.log(`Database connection name ${connection.name}.`);
    console.log(`Server ${process.env.APP_NAME}, running on ${server.info.uri}`);
  }

  return server.listener;
};
