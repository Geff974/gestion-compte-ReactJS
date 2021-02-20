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
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        };
        fetch('http://localhost:3001/customers', requestOptions)
            .then((err, response) => {
                if (err) {
                    alert('Erreur : ' + err);
                } else {
                    alert('Nouveau client créé !');
                    fetch('http://localhost:3001/customers').then((response) => {
                        return response.json();
                    }).then((response) => {
                        this.props.handler(response);
                    })
                }
                this.setState({name: '', email: ''});
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