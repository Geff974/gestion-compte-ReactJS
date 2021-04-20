import { CUSTOMER_UPDATE, CUSTOMER_ADD } from './type';

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