import { getRepository as repository } from 'typeorm';
import Customer from '../../models/customer.model';
import CustomerService from '../customer';
import Boom from '@hapi/boom';
const customerService = new CustomerService();


export default class AuthService {
    customerRepository() {
        return repository(Customer);
    }

    async validateCookie(request, session) {
        const user = await customerService.findOne(session.id);

        if (!user) return { valid: false };

        return { valid: true, credentials: user };
    }

    async validate(request, username, password) {
        const user = await customerService.findByEmail(username);

        if (!user) {
            return { credentials: null, isValid: false };
        }

        const isValid = await customerService.isValidPassword(password, user.password);

        return { isValid, credentials: user };
    }

    async login(form) {
        const { email, password } = form;

        const user = await customerService.findByEmail(email);

        if (user && await customerService.isValidPassword(password, user.password)) {
            return user;
        } else {
            throw Boom.unauthorized('Invalid login credentials.');
        }
    }
}