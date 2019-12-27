const landing = {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return h.response({
            statusCode: 200,
            message: 'Hello world.',
        });
    }
};

export default landing;
