import React, { Component } from 'react';

class CreateCustomer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: ''
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        fetch(process.env.REACT_APP_API_URL + '/customers', requestOptions)
            .then(res => {
                alert(res)
                this.setState({ name: '', email: '' });
                this.props.updateAfterAddCustomer();
            })
    }

    render() {
        const { name, email } = this.state;
        return (
            <div className="row">
                <form onSubmit={this.submitHandler} className="mt-4 col-10">
                    <div className="input-group align-items-end">
                        <label htmlFor="name" className="form-label ms-5 me-2">Nom : </label>
                        <input type="text" name='name' className="form-control" value={name} onChange={this.changeHandler} />

                        <label htmlFor="email" className="form-label ms-5 me-2">e-mail : </label>
                        <input type="email" name='email' className="form-control" value={email} onChange={this.changeHandler} />

                        <button type='submit' className="btn btn-success ms-5">Ajouter</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateCustomer;