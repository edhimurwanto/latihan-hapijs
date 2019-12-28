import CustomerService from '../services/customer.service';

const validate = async (request, username, password) => {

    const user = await new CustomerService().findByEmail(username);

    if (!user) {
        return { credentials: null, isValid: false };
    }

    const isValid = await new CustomerService().isValidPassword(password, user.password);
    const credentials = { id: user.id, name: user.fullname };

    return { isValid, credentials };
}

export default validate;