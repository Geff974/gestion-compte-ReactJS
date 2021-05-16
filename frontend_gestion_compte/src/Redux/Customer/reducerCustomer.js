import { CUSTOMER_ADD, CUSTOMER_ERASE, CUSTOMER_REINIT, CUSTOMER_UPDATE } from './type';

const initialState = {
    customers: []
}

const customerReducer = (state = initialState, action) => {
    switch(action.type) {
        case CUSTOMER_ADD:
            return {
                ...state,
                customers: [...state.customers, action.customer]
            }
        case CUSTOMER_UPDATE:
            const indexCustomer = state.customers.findIndex(cust => cust.name == action.customer);
            if (indexCustomer > -1) {
                state.customers[indexCustomer].paiement = action.paiement;
                state.customers[indexCustomer].facture = action.facture;
            }
            return state;
        case CUSTOMER_ERASE:
            const indexCustomerToErase = state.customers.findIndex(cust => cust.id === action.customer.id);
            const customersAfterErase = state.customers;
            customersAfterErase.splice(indexCustomerToErase, 1);
            return {
                ...state,
                customers: customersAfterErase
            }
        case CUSTOMER_REINIT:
            return {
                customers: initialState.customers
            }
        default:
            return state;
    }
}

export default customerReducer;