import { CUSTOMER_ADD, CUSTOMER_REINIT } from './type';

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
        case CUSTOMER_REINIT:
            return {
                customers: initialState.customers
            }
        default:
            return state;
    }
}

export default customerReducer;