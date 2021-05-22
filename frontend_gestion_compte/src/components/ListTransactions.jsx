import React from 'react';
import TransactionItem from './TransactionItem';

const ListTransactions = ({ transactions, edit = false, doubleClick = () => { console.log() } }) => {
    return (
        <div>
            { transactions.map((transaction, k) => {
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