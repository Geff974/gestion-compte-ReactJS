import React from 'react';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import '../styles/TransactionItem.css';
import ButtonEraseTransaction from './smallComponents/ButtonEraseTransaction';

const TransactionItem = ({ transaction, edit = false }) => {

    const signAmount = transaction.amount > 0 ? 'positive' : 'negative';

    const dateSlice = (str) => {
        const strSplit = str.split('-');
        const strFinal = strSplit[2] + '/' + strSplit[1];
        return strFinal;
    }

    return (
        <div className="transaction-item">
            <div className={`trans-item-icon ${signAmount}`}>
                {transaction.amount > 0 ? <MdArrowUpward size={22} /> : <MdArrowDownward size={22} />}
            </div>

            <div className="trans-item-info">
                <h4>{transaction.name}</h4>
                <p>{transaction.designation}</p>
            </div>

            <div className="trans-item-date-amount">
                <p className="trans-date">{dateSlice(transaction.date)}</p>
                {transaction.amount > 0 ? <h4>+ {transaction.amount},00 €</h4> : <h4 className="amount-negative">- {-transaction.amount},00 €</h4>}
                {edit &&
                    <ButtonEraseTransaction transaction={transaction} />
                }
            </div>
        </div>
    );
};

export default TransactionItem;