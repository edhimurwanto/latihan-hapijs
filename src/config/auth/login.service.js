import { getRepository as repository } from 'typeorm';
import Customer from '../../models/customer.model';
import CustomerService from '../../services/customer.service';
import Boom from '@hapi/boom';
const customerService = new CustomerService();


export default class LoginService {
    customerRepository() {
        return repository(Customer);
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