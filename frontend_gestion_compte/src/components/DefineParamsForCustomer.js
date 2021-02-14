import React from 'react'
import { useParams } from 'react-router-dom'
import DetailCustomer from './detailCustomer';

function DefineParamsForCustomer() {

    const { id } = useParams();

    return (
        <div>
            <DetailCustomer customer={id} />
        </div>
    )
}

export default DefineParamsForCustomer
