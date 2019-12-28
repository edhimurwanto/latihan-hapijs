import CustomerService from '../../services/customer.service';
import Joi from '@hapi/joi';
import Boom from '@hapi/boom';
const customerService = new CustomerService();

const customerRoutes = [
    {
        method: 'GET',
        path: '/customers',
        config: {
            auth: 'simple',
            handler: async (request, h) => {

                const customers = await customerService.findAll();
                return h.response({
                    statusCode: 200,
                    message: 'Success',
                    customers
                }).code(200);
            }
        },
    },
    {
        method: 'GET',
        path: '/customers/{id}',
        config: {
            auth: 'simple',
            handler: async (request, h) => {

                try {
                    const { id } = request.params;
                    const customer = await customerService.findOne({ id });
 
                    return h.response({
                        statusCode: 200,
                        message: 'Success',
                        customer
                    }).code(200);

                } catch (error) {
                    return error;
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/customers',
        config: {
            handler: async (request, h) => {
                const customer = await customerService.create(request.payload);
                return h.response({
                    statusCode: 201,
                    customer
                }).code(201);
            },
            validate: {
                payload: {
                    fullname: Joi.string().max(100).required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().min(6).max(200).required(),
                    birthdate: Joi.date().required(),
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/customers',
        config: {
            auth: 'simple',
            handler: async (request, h) => {
                try {
                    const customer = await customerService.update(request.payload);
                    return h.response({
                        statusCode: 200,
                        customer
                    }).code(200);
                } catch (error) {

                    return error;
                }
            },
            validate: {
                payload: {
                    id: Joi.required(),
                    fullname: Joi.string().max(100).required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().min(6).max(200).required(),
                    birthdate: Joi.date().required(),
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/customers/{id}',
        config: {
            handler: async (request, h) => {

                const { id } = request.params;
                const customer = await customerService.findOne({ id });

                if (!customer) {
                    throw Boom.notFound('Customer not found.');
                } else {
                    await customerService.delete(id);
                    return h.response().code(204);
                }
            }
        },
    },
    {
        method: 'GET',
        path: '/customers/search',
        config: {
            handler: async (request, h) => {

                const customers = await customerService.search(request.query);
                if (!customers) throw Boom.notFound('Customer not found.');
                return h.response({
                    statusCode: 200,
                    customers
                }).code(200);
            }
        }
    },
];

export default customerRoutes;
