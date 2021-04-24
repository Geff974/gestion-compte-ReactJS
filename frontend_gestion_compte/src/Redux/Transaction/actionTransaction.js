import { TRANSACTION_ADD, TRANSACTION_REINIT } from './type';

export const transactionAdd = (transaction) => {
    return {
        type: TRANSACTION_ADD,
        transaction: transaction
    }
}

export const transactionReinit = () => {
    return {
        type: TRANSACTION_REINIT
    }
}