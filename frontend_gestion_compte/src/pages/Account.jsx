import React from 'react';
import { useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2';
import '../styles/Account.css';

const Account = () => {

    const transactions = useSelector(state => state.transactions.transactions)
    const month = ['JANVIER', 'FEVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DECEMBRE'];
    const positifAmounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let negatifAmounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const currentMonth = new Date().getMonth();

    month.splice(currentMonth + 1, month.length - 1);

    transactions.forEach(trans => {
        const monthTrans = new Date(trans.date).getMonth();
        const year = new Date(trans.date).getFullYear();
        if (new Date(trans.date).getFullYear() === new Date().getFullYear()) {
            if (trans.amount > 0) {
                positifAmounts[monthTrans] = positifAmounts[monthTrans] + trans.amount;
            } else {
                negatifAmounts[monthTrans] = negatifAmounts[monthTrans] + trans.amount;
            }
        }
    });

    negatifAmounts.forEach((el, i) => {
        negatifAmounts[i] = -el;
    })


    const data = {
        labels: month,
        datasets: [
            {
                label: 'Facture',
                backgroundColor: 'green',
                data: positifAmounts
            },
            {
                label: 'Paiement',
                backgroundColor: 'blue',
                data: negatifAmounts
            }
        ]
    }

    const test = () => {
        console.log(positifAmounts);
        console.log(negatifAmounts);
    }

    return (
        <div className="account-component">
            <h1>Statistic</h1>

            <Line
                data={data}
                // height={200}
                options={{
                    responsive: true,
                    // maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true
                                }
                            }
                        ]
                    }
                }}
            />
        </div>
    );
};

export default Account;