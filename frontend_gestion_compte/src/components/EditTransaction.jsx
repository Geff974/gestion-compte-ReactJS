import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { FcCalendar, FcContacts, FcCurrencyExchange, FcSms } from 'react-icons/fc';
import '../styles/EditTransaction.css';

const EditTransaction = ({ transaction = { id: 0, date: "2017-03-11", name: 0, designation: 'Aucune', amount: 0 } }) => {

    const editTransaction = useRef(null);
    const customers = useSelector(state => state.customers.customers);
    const sizeOfIcon = 35;

    const [transactionEdit, setTransactionEdit] = useState({
        id: transaction.id,
        date: transaction.date,
        name: transaction.name,
        designation: transaction.designation,
        amount: transaction.amount
    })

    useEffect(() => {
        if (customers) {
            const customerSelected = customers.find(cust => cust.name === transaction.name);
            if (customerSelected) {
                setTransactionEdit({ ...transaction, name: customerSelected.id });
                editTransaction.current.className = "edit-transaction open";
            }
        }
    }, [transaction])

    const handleChange = e => {
        setTransactionEdit({ ...transactionEdit, [e.target.name]: e.target.value });
    }

    const handleBlurCurrency = e => {
        e.target.value += '.00 €';
    }

    const handleFocusCurrency = e => {
        // Check if decimal
        const decimalTarget = e.target.value.substring(e.target.value.length - 4, e.target.value.length - 2);

        if (decimalTarget !== "00") {
            e.target.value = e.target.value.substring(0, e.target.value.length - 3);
        } else {
            e.target.value = e.target.value.substring(0, e.target.value.length - 5);
        }

    }

    const closeModal = () => {
        editTransaction.current.className = "edit-transaction";
    }

    return (
        <div ref={editTransaction} className="edit-transaction">
            <form>
                <div className="input-edit-transaction">
                    <i> <FcCalendar size={sizeOfIcon} /> </i>
                    <input type="date" placeholder={transactionEdit.date} value={transactionEdit.date} name='date' onChange={handleChange} />
                </div>
                {customers &&
                    <div className="input-edit-transaction">
                        <i> <FcContacts size={sizeOfIcon} /> </i>
                        <select name="name" value={transactionEdit.name} onChange={handleChange}>
                            {customers.map((customer, k) => {
                                return (
                                    <option key={k} value={customer.id}> {customer.name} </option>
                                )
                            })}
                        </select>
                    </div>
                }
                <div className="input-edit-transaction">
                    <i> <FcSms size={sizeOfIcon} /> </i>
                    <input type="text" placeholder={transactionEdit.designation} value={transactionEdit.designation} name='designation' onChange={handleChange} />
                </div>
                <div className="input-edit-transaction">
                    <i> <FcCurrencyExchange size={sizeOfIcon} /> </i>
                    <input type="text" className="input-edit-transaction-money" placeholder={transactionEdit.amount} value={transactionEdit.amount} name='amount' onBlur={handleBlurCurrency} onFocus={handleFocusCurrency} onChange={handleChange} />
                </div>

                <div className="input-edit-transaction">
                    <button type="submit" className="btn-edit btn-valider">Modifier</button>
                    <button type="submit" className="btn-edit btn-cancel" onClick={closeModal}>Annuler</button>
                </div>
            </form>
        </div>
    );
};

export default EditTransaction;