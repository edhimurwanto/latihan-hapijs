import auth from '../../plugins/auth/enable';

const landing = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.response({
                statusCode: 200,
                message: 'Hello world.',
            });
        },
        options: {
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/protected',
        handler: (request, h) => {

            const user = request.auth.credentials;

            return h.response({
                statusCode: 200,
                message: `Welcome to your private world, ${user.fullname}!`,
            });
        },
        options: { auth }
    },
]

export default landing;
