import React from 'react';
import { useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2';

const Account = () => {

    const transactions = useSelector(state => state.transactions.transactions)
    const month = ['JANVIER', 'FEVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DECEMBRE'];
    const positifAmounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const negatifAmounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    transactions.forEach(trans => {
        const monthTrans = new Date(trans.date).getMonth();
        const year = new Date(trans.date).getFullYear();
        console.log('year ' + year);
        console.log('new : ' + new Date().getFullYear())
        if (new Date(trans.date).getFullYear() === new Date().getFullYear()) {
            if (trans.amount > 0) {
                positifAmounts[monthTrans] = positifAmounts[monthTrans] + trans.amount;
            } else {
                negatifAmounts[monthTrans] = negatifAmounts[monthTrans] + trans.amount;
            }
        }
    });

    const test = () => {
        console.log(positifAmounts);
        console.log(negatifAmounts);
    }

    return (
        <div>
            <h1 onClick={test}>Statistic</h1>

            <Line
                data={{
                    labels: month,
                    // label: ['Red', 'Blue', 'Yellow', 'Purple', 'Green', 'Orange'],
                    datasets: [
                        {
                            label: 'Facture',
                            data: positifAmounts,
                            backgroundcolor: 'red'
                        }
                    ]
                }}
                height={200}
            // width={200}
            // options={{
            //     maintainAspectRatio: false
            // }}
            />
        </div>
    );
};

export default Account;