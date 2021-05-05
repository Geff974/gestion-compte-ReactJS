import { TRANSACTION_ADD, TRANSACTION_REINIT, TRANSACTION_UPDATE } from './type';

const initialState = {
    transactions: []
}

const transactionReducer = (state = initialState, action) =>{
    switch(action.type) {
        case TRANSACTION_ADD:
            return {
                ...state,
                transactions: [action.transaction, ...state.transactions]
            }
        case TRANSACTION_REINIT:
            return {
                transactions: initialState.transactions
            }
        case TRANSACTION_UPDATE:
            const indexOfTransaction = state.transactions.findIndex(trans => trans.id === action.transaction.id);
            const newTransactions = state.transactions;
            newTransactions[indexOfTransaction] = action.transaction;
            return {
                ...state,
                transactions: newTransactions
            }
        default:
            return state;
    }
}

export default transactionReducer;