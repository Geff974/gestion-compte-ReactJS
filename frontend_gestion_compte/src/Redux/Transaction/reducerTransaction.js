import { TRANSACTION_ADD, TRANSACTION_REINIT } from './type';

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
        case TRANSACTION_REINIT:
            return {
                transactions: initialState.transactions
            }
        default:
            return state;
    }
}

export default transactionReducer;