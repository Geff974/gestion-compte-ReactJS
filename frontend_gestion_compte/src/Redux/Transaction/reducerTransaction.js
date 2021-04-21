import { TRANSACTION_ADD, TRANSACTION_ERASE, TRANSACTION_UPDATE } from './type';

const initialState = {
    transactions: []
}

const transactionReducer = (state = initialState, action) =>{
    switch(action.type) {
        case TRANSACTION_ADD:
            return {
                ...state,
                transactions: [...state.transactions, action.transaction]
            }
        default:
            return state;
    }
}

export default transactionReducer;