import AuthService from '../../services/auth';
import * as basic from '@hapi/basic';

const validate = new AuthService().validate;

const basicAuthPlugin = {
    name: 'basicAuthPlugin',
    version: '1.0',
    register: async (server, options) => {

        await server.register(basic);
        server.auth.strategy('simple', 'basic', { validate });
    }
}

export default basicAuthPlugin;