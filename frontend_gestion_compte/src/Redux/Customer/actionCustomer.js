import { CUSTOMER_UPDATE, CUSTOMER_ADD, CUSTOMER_REINIT } from './type';

export const customerAdd = (customer) => {
    return {
        type: CUSTOMER_ADD,
        customer: customer
    }
}

export const customerUpdate = (transactions, name_customer) => {
    let paiement = 0;
    let facture = 0;
    transactions.map(trans => {
        if (trans.name == name_customer) {
            trans.amount > 0 ? facture += trans.amount : paiement+= trans.amount;
        }
    })
    return {
        type: CUSTOMER_UPDATE,
        customer: name_customer,
        paiement: paiement,
        facture: facture
    }
}

export const customerReinit = () => {
    return {
        type: CUSTOMER_REINIT
    }
}