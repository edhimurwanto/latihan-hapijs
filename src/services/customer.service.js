import { getRepository as repository, Like } from 'typeorm';
import Customer from '../models/customer.model';
import bcrypt from 'bcrypt';
import Boom from '@hapi/boom';

export default class CustomerService {
    customerRepository() {
        return repository(Customer);
    }

    findAll() {
        return this.customerRepository().find();
    }

    async findOne(id) {
        const customer = await this.customerRepository().findOne(id);

        if (!customer) throw Boom.notFound('Customer not found.');
        return customer;
    }

    findByEmail(email) {
        return this.customerRepository().findOne({ email });
    }

    search(payload) {
        if (payload.email) {
            return this.findByEmail(payload.email);
        } else if (payload.fullname) {
            return this.customerRepository().find({ fullname: Like(`%${payload.fullname}%`) });
        } else if (payload.fullname && payload.email) {
            return this.customerRepository().find({
                fullname: Like(`%${payload.fullname}%`),
                email: Like(`%${payload.email}%`)
            });
        } else if (payload.id) {
            return this.customerRepository().findOne({ id: payload.id });
        }
    }

    async create(customerData) {
        const { password } = customerData;
        customerData.password = await this.beforeCreate(password);
        return await this.customerRepository().save(customerData);
    }

    async update(customerData) {
        const id = customerData.id;
        await this.findOne(id);

        const { password } = customerData;
        customerData.password = await this.beforeCreate(password);
        return await this.customerRepository().save(customerData);
    }

    async beforeCreate(password) {
        const salt = bcrypt.genSaltSync();
        return await bcrypt.hashSync(password, salt);
    }

    async isValidPassword(password, checkPassword) {
        return await bcrypt.compareSync(password, checkPassword);
    }

    delete(id) {
        return this.customerRepository().delete(id);
    }
}