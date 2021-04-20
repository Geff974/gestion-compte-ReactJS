import { TRANSACTION_ADD, TRANSACTION_ERASE, TRANSACTION_UPDATE } from './type';

export const transactionAdd = (transaction) => {
    return {
        type: TRANSACTION_ADD,
        transaction: transaction
    }
}