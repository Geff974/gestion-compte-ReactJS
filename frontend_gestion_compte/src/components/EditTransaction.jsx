import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FcCalendar, FcContacts, FcCurrencyExchange, FcSms } from 'react-icons/fc';
import '../styles/EditTransaction.css';
import axios from 'axios';
import { transactionUpdate } from '../Redux/Transaction/actionTransaction';
import { customerUpdate } from '../Redux/Customer/actionCustomer';

const EditTransaction = React.forwardRef((props, ref) => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user.info);
    const customers = useSelector(state => state.customers.customers);
    const sizeOfIcon = 35;

    const [transactionEdit, setTransactionEdit] = useState({
        id: props.transaction.id,
        date: props.transaction.date,
        name: props.transaction.name,
        designation: props.transaction.designation,
        amount: props.transaction.amount,
        id_user: user.id
    })

    useEffect(() => {
        if (customers) {
            const customerSelected = customers.find(cust => cust.name === props.transaction.name);
            if (customerSelected) {
                setTransactionEdit({ ...props.transaction, name: customerSelected.id, id_user: user.id });
                ref.current.className = "edit-transaction open";
            }
        }
    }, [props.transaction])

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

    const closeModal = e => {
        if (e) {
            e.preventDefault();
        }
        ref.current.className = "edit-transaction";
    }

    const sendEdit = e => {
        e.preventDefault();
        const customerSelected = customers.find(cust => cust.id === transactionEdit.name);
        let transactionToDispatch = {};
        axios.put(process.env.REACT_APP_API_URL + '/transactions', transactionEdit)
            .then(result => {
                transactionToDispatch = result.data[0];
                transactionToDispatch = { ...transactionToDispatch, name: customerSelected.name }
                dispatch(transactionUpdate(transactionToDispatch));
                dispatch(customerUpdate(customerSelected.name));
            })
            .catch(err => alert(err));
        closeModal();
    }

    return (
        <div ref={ref} className="edit-transaction">
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
                    <button type="submit" className="btn-edit btn-valider" onClick={sendEdit}>Modifier</button>
                    <button type="submit" className="btn-edit btn-cancel" onClick={closeModal}>Annuler</button>
                </div>
            </form>
        </div>
    );
})

export default EditTransaction;