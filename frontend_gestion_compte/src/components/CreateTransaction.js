import React, { Component } from 'react';

class CreateTransaction extends Component {

    constructor(props) {
        super(props);

        this.state = {
            date: '',
            customer: '',
            designation: '',
            amount: 0
        }
        this.customers = [];
        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }
    
    componentDidMount = () => {
        fetch(process.env.REACT_APP_API_URL + '/customers')
            .then(res => res.json())
            .then(res => this.customers = res)
    }

    changeHandler = e => {
        if (e.target.name === 'date') {
            this.setState(() => ({ date: e.target.value.toLocaleString() }))
        } else {
            this.setState(() => ({ [e.target.name]: e.target.value }))
        }
    }

    submitHandler = e => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        fetch(process.env.REACT_APP_API_URL + '/transactions', requestOptions)
            .then(() => {
                const reinitState = {
                    date: '',
                    customer: '',
                    designation: '',
                    amout: 0
                };
                this.setState(reinitState);
                this.props.updateState();
            })
    }

    render() {
        const { date, customer, designation, amount } = this.state;
        return (
            <div className="row">
                <form onSubmit={this.submitHandler} className="my-5">
                    <div className="input-group align-items-end col-sm-12">
                        <div className="col-6 pe-1">
                            <label htmlFor="date" className="form-label mx-3">Date : </label>
                            <input type="date" name='date' className="form-control" value={date} onChange={this.changeHandler} min="2019-01-01" max="2021-12-31" />
                        </div>

                        <div className="col-6 ps-1">
                            <label htmlFor="customer" className="form-label mx-3">Client : </label>
                            { this.props.customer !== undefined &&
                                <input type="text" className="form-control" name="customer" value={this.props.customer} disabled/>
                            }

                            { this.props.customer === undefined &&
                                <select className="form-select" name="customer" value={customer} onChange={this.changeHandler}>
                                    <option value=''></option>
                                    {this.customers.map((customer, k) => {
                                        return (
                                            <option key={k} value={customer.id}>{customer.name}</option>
                                        )
                                    })}
                                </select>
                            }
                        </div>

                        <div className="col-6 mt-3 pe-1">
                            <label htmlFor="designation" className="form-label mx-3">Designation : </label>
                            <input type="text" name='designation' className="form-control" value={designation} onChange={this.changeHandler} />
                        </div>

                        <div className="col-6 ps-1">
                            <label htmlFor="amount" className="form-label mx-3">Montant : </label>
                            <input type="number" name='amount' className="form-control" value={amount} onChange={this.changeHandler} />
                        </div>

                        <div className="mx-auto mt-3">
                            <button type='submit' className="btn btn-success px-5">Ajouter</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateTransaction;