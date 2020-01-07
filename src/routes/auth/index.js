import AuthService from '../../services/auth';
import Joi from '@hapi/joi';
const authService = new AuthService();


const authRoutes = [
    {
        method: 'POST',
        path: '/login',
        config: {
            auth: {
                mode: 'try'
            },
            handler: async (request, h) => {
                const customer = await authService.login(request.payload);

                if (customer) {
                    request.cookieAuth.set({ id: customer.id });
                    return h.response({
                        statusCode: 200,
                        message: 'Login success.',
                        customer
                    }).code(200);
                } else {
                    return { message: 'invalid credentials.' };
                }

            },
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().min(6).max(200).required(),
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/logout',
        config: {
            handler: async (request, h) => {
                await request.cookieAuth.clear();
                return h.response({
                    statusCode: 200,
                    message: 'Logout success.',
                }).code(200);
            }
        }
    }
];

export default authRoutes;