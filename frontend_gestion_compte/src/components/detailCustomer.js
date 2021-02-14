import React from 'react';
class DetailCustomer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCustomer: {}
        };
    }

    filtreCustomer(customers) {
        const cust = customers.find(el => el.name === this.props.customer);
        this.setState({ currentCustomer: cust ? cust : { name: 'Aucune correspondance !' } })
    }

    componentDidMount() {
        fetch('http://localhost:3001/customers').then((response) => {
            return response.json();
        }).then((response) => {
            this.filtreCustomer(response);
        })
    }


    render() {
        return (
            <div>
                <h2>{(this.state.currentCustomer.name) ? this.state.currentCustomer.name : <p>Chargement...</p>}</h2>
            </div>
        );
    }
};

export default DetailCustomer;