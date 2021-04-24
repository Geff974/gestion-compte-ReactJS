import { CUSTOMER_UPDATE, CUSTOMER_ADD, CUSTOMER_REINIT } from './type';

export const customerAdd = (customer) => {
    return {
        type: CUSTOMER_ADD,
        customer: customer
    }
}

export const customerUpdate = () => {
    return {
        type: CUSTOMER_UPDATE
    }
}

export const customerReinit = () => {
    return {
        type: CUSTOMER_REINIT
    }
}