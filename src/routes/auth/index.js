import AuthService from '../../config/auth/login.service';
import Joi from '@hapi/joi';
const authService = new AuthService();


const authRoutes = [
    {
        method: 'POST',
        path: '/login',
        config: {
            handler: async (request, h) => {
                const customer = await authService.login(request.payload);

                return h.response({
                    statusCode: 200,
                    message: 'Login success.',
                    customer
                }).code(200);
            },
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().min(6).max(200).required(),
                }
            }
        }
    },
];

export default authRoutes;