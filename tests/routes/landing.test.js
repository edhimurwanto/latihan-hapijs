import request from 'supertest';
import init from '../../src/api';

describe('Landing', () => {

    let app;

    beforeEach( async () => {
        app = await init();
    });

    it('GET / endpoint should return hello message', async () => {
        const response = await request(app)
            .get('/');

            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject({
                statusCode: 200,
                message: "Hello world."
            });

            expect(response.body).toEqual({
                statusCode: 200,
                message: "Hello world."
            });
    });

    afterEach(async () => {
        if (app) {
            app.close();
        }
    });
})
