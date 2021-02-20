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
        console.log(this.state);
        fetch('http://localhost:3001/customers', { method: 'post', body: this.state })
            .then((response) => {
                console.log(response);
            })
    }

    render() {
        const { name, email } = this.state;
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor="name">Nom : </label>
                    <input type="text" name='name' value={name} onChange={this.changeHandler} />

                    <label htmlFor="email">e-mail : </label>
                    <input type="email" name='email' value={email} onChange={this.changeHandler} />

                    <button type='submit'>Ajouter</button>
                </form>
            </div>
        );
    }
}

export default CreateCustomer;