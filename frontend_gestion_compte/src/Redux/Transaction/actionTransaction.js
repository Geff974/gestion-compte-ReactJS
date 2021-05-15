import { TRANSACTION_ADD, TRANSACTION_REINIT, TRANSACTION_UPDATE, TRANSACTION_ERASE } from './type';

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

export const transactionUpdate = (transaction) => {
    return {
        type: TRANSACTION_UPDATE,
        transaction: transaction
    }
}

export const transactionErase = (id_transaction) => {
    return {
        type: TRANSACTION_ERASE,
        id_transaction: id_transaction
    }
}