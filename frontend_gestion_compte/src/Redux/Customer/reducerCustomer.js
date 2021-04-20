import { CUSTOMER_UPDATE, CUSTOMER_ERASE, CUSTOMER_ADD } from './type';

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
        default:
            return state;
    }
}

export default customerReducer;