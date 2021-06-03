import React from 'react';
import TransactionItem from './TransactionItem';

const ListTransactions = ({ transactions, edit = false, doubleClick = () => { console.log() }, nbrRepeat = transactions.length }) => {

    const transactionFilter = [...transactions];
    transactionFilter.splice(nbrRepeat, transactionFilter.length - nbrRepeat);

    return (
        <div>
            { transactionFilter.map((transaction, k) => {
                return (
                    <div key={k} onDoubleClick={() => doubleClick(transaction)}>
                        <TransactionItem transaction={transaction} edit={edit} />
                    </div>
                )
            })}
        </div>
    );
};

export default ListTransactions;