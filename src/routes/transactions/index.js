import Transactionservice from '../../services/transaction';
import Joi from '@hapi/joi';
import Boom from '@hapi/boom';
const transactionservice = new Transactionservice();

const customerRoutes = [
    {
        method: 'GET',
        path: '/transactions',
        config: {
            handler: async (request, h) => {

                const transactions = await transactionservice.find();
                return h.response({
                    statusCode: 200,
                    transactions
                }).code(200);
            }
        },
    },
    {
        method: 'GET',
        path: '/transactions/{id}',
        handler: async (request, h) => {

            const { id } = request.params;
            const customer = await transactionservice.findOne({ id });

            if (!customer) {
                throw Boom.notFound('Customer not found.');
            } else {
                return h.response({
                    statusCode: 200,
                    message: 'Success',
                    customer
                }).code(200);
            }
        }
    },
    {
        method: 'POST',
        path: '/transactions',
        config: {
            handler: async (request, h) => {
                const customer = await transactionservice.create(request.payload);
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
    // {
    //     method: 'PUT',
    //     path: '/transactions',
    //     config: {
    //         handler: async (request, h) => {
    //             const customer = await transactionservice.update(request.payload);
    //             return h.response({
    //                 statusCode: 200,
    //                 customer
    //             }).code(200);
    //         },
    //         validate: {
    //             payload: {
    //                 id: Joi.required(),
    //                 fullname: Joi.string().max(100).required(),
    //                 email: Joi.string().email().required(),
    //                 password: Joi.string().min(6).max(200).required(),
    //                 birthdate: Joi.date().required(),
    //             }
    //         }
    //     }
    // },
    {
        method: 'DELETE',
        path: '/transactions/{id}',
        config: {
            handler: async (request, h) => {

                const { id } = request.params;
                const customer = await transactionservice.findOne({ id });

                if (!customer) {
                    throw Boom.notFound('Customer not found.');
                } else {
                    await transactionservice.delete(id);
                    return h.response().code(204);
                }
            }
        },
    },
    // {
    //     method: 'GET',
    //     path: '/transactions/search',
    //     config: {
    //         handler: async (request, h) => {

    //             const transactions = await transactionservice.search(request.query);
    //             if (!transactions) throw Boom.notFound('Customer not found.');
    //             return h.response({
    //                 statusCode: 200,
    //                 transactions
    //             }).code(200);
    //         }
    //     }
    // },
];

export default customerRoutes;