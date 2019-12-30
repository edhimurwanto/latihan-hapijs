import CustomerService from '../../src/services/customer';
import init from '../../src/api';
import Boom from '@hapi/boom';

const customerService = new CustomerService();
let server;

const payload = {
    "fullname": "Customer 3",
    "email": "cs3@mail.com",
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

// unit test for find customer by specific identifier
describe('Find Customer by specific identifier', () => {

    beforeEach(async () => {
        server = await init();
        await customerService.customerRepository().clear();
    });

    it('should return customer', async () => {

        const savedCustomer = await customerService.customerRepository().save(payload);
        const customer = await customerService.findOne(savedCustomer.id);

        expect(customer).toMatchObject({
            id: savedCustomer.id,
            fullname: savedCustomer.fullname,
            email: savedCustomer.email
        })
    })

    afterEach(async () => {
        if (server) {
            server.close();
        }
    });
});

// unit test for service find all customer 
describe('Find all customer', () => {

    beforeEach(async () => {
        await customerService.customerRepository().clear();
    });

    it('should return array of customers object', async () => {

        let savedCustomers = [];

        for (let i = 0; i < payloads.length; i++) {
            savedCustomers.push(await customerService.customerRepository().save(payloads[i]));
        }

        const customers = await customerService.findAll();

        expect(customers).toEqual(expect.arrayContaining(savedCustomers));
    });

    it('should return array of with match length', async () => {

        let savedCustomers = [];

        for (let i = 0; i < payloads.length; i++) {
            savedCustomers.push(await customerService.customerRepository().save(payloads[i]));
        }

        const customers = await customerService.findAll();

        expect(customers).toHaveLength(savedCustomers.length);
    });

    afterEach(async () => {
        if (server) {
            server.close();
        }
    });
});

// unit test for service CREATE customer 
describe('Create Customer', () => {

    beforeEach(async () => {
        await customerService.customerRepository().clear();
    });

    it('length of customer should plus 1', async () => {
        const lengthBefore = await customerService.findAll();
        const customer = await customerService.create({
            "fullname": "Customer 4",
            "email": "cs4@mail.com",
            "password": "P@ssw0rd",
            "birthdate": "2012-10-10"
        });
        const resultLength = await customerService.findAll();

        expect(resultLength.length).toBe(lengthBefore.length + 1);
        expect(customer).toMatchObject({
            "fullname": "Customer 4",
            "email": "cs4@mail.com",
            "birthdate": "2012-10-10"
        })
    });

    afterEach(async () => {
        if (server) {
            server.close();
        }
    });
})

// unit test for service UPDATE customer 
describe('Update Customer', () => {

    beforeEach(async () => {
        await customerService.customerRepository().clear();
    });

    it('should throw an exception if customer with specific identifier not found.', async () => {

        const arg = [null, undefined, NaN, '', {}];

        arg.forEach(async (element) => {

            await expect(customerService.update({ id: element })).rejects.toThrow(Boom);
        });
    });

    it('should return updated data of customer', async () => {
        const customer = await customerService.customerRepository().save(payload);

        customer.fullname = "Edi Murwanto";
        customer.email = "edhi@mail.com";

        const updatedCustomer = await customerService.update(customer);

        expect(updatedCustomer).toMatchObject({
            fullname: "Edi Murwanto",
            email: "edhi@mail.com"
        })
    })

    afterEach(async () => {
        if (server) {
            server.close();
        }
    });
});