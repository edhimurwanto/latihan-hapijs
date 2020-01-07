import * as cookieAuth from '@hapi/cookie';
import AuthService from '../../services/auth';

const auth = new AuthService();

const authPlugin = {
    name: 'authPlugin',
    version: '1.0',
    register: async (server, options) => {
        const authConfig = {
            cookie: {
                name: options.sid,
                password: options.password,
                isSecure: options.secure,
                isHttpOnly: options.httpOnly,
                ttl: options.ttl,
                clearInvalid: true,
            },
            validateFunc: auth.validateCookie
        }

        await server.register(cookieAuth);
        server.auth.strategy(process.env.AUTH_COOKIE_LABEL, 'cookie', authConfig);
        server.auth.default(process.env.AUTH_COOKIE_LABEL);
    }
}

export default authPlugin;