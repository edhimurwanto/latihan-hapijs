import authPlugin from './auth';
import basicAuthPlugin from './basic-auth/basic-auth.plugin';

const plugins = [
  authPlugin,
  basicAuthPlugin
];

export default function(pluginOptions) {
  return plugins.map((plugin) => {
    const options = pluginOptions[plugin.name];

    return {
      plugin,
      options,
    }
  });
};
