import request from 'supertest';
import init from '../../src/api';
import CustomerService from '../../src/services/customer.service';

const service = new CustomerService();
let server;

const payload = {
    "fullname": "Edi Murwanto",
    "email": "edhi@mail.com",
    "password": "P@ssw0rd",
    "birthdate": "2012-10-10"
}

const payloads = [
    {
        "fullname": "Customer 1",
        "email": "cs1@mail.com",
        "password": "P@ssw0rd",
        "birthdate": "2012-10-10"
    },
    {
        "fullname": "Customer 2",
        "email": "cs2@mail.com",
        "password": "P@ssw0rd",
        "birthdate": "2012-10-10"
    },
    {
        "fullname": "Customer 3",
        "email": "cs3@mail.com",
        "password": "P@ssw0rd",
        "birthdate": "2012-10-10"
    }
];

describe('GET /customers endpoint', () => {


    beforeEach(async () => {
        server = await init();
        await service.customerRepository().clear();
    });

    it('should return statusCode is 200, message, and array of customers', async () => {
        payloads.forEach(async (element) => {
            await service.create(element);
        });

        const response = await request(server)
            .get('/customers')
            .auth('cs1@mail.com', 'P@ssw0rd');

        const actual = await service.findAll();

        await expect(response.statusCode).toBe(200);
        await expect(response.body).toMatchObject({
            statusCode: 200,
            message: "Success",
            customers: actual
        });
    });

    afterEach(async () => {
        if (server) {
            server.close();
        }
    });
});

describe('GET /customers/{id} endpoint', () => {

    beforeEach(async () => {
        await service.customerRepository().clear();
    });

    it('should return statusCode is 200, message, and a customer object', async () => {

        const savedCustomer = await service.create(payload);

        const response = await request(server)
            .get(`/customers/${savedCustomer.id}`)
            .auth('edhi@mail.com', 'P@ssw0rd');

        const actual = await service.findOne(savedCustomer.id);

        await expect(response.statusCode).toBe(200);
        await expect(response.body).toMatchObject({
            statusCode: 200,
            message: "Success",
            customer: actual
        });
    });

    it('should return statusCode 404 and message not found if customer with specific identifier not found.', async () => {

        await service.create({
            "fullname": "Edi Murwanto2",
            "email": "edhi2@mail.com",
            "password": "P@ssw0rd",
            "birthdate": "2012-10-10"
        });

        const response = await request(server)
            .get('/customers/123242')
            .auth('edhi2@mail.com', 'P@ssw0rd');

        await expect(response.statusCode).toBe(404);
        await expect(response.body).toMatchObject({
            statusCode: 404,
            error: "Not Found",
            message: "Customer not found.",
        });
    })

    afterEach(async () => {
        if (server) {
            server.close();
        }
    });
})
