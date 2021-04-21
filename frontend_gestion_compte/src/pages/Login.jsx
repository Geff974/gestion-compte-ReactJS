import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userInfo } from '../Redux/User/actionUser';
import { useHistory } from 'react-router';
import axios from 'axios';
import '../styles/Login.css';
import { customerAdd } from '../Redux/Customer/actionCustomer';
import { transactionAdd } from '../Redux/Transaction/actionTransaction';

const Login = () => {

    let history = useHistory();
    const dispatch = useDispatch();

    const [userInput, setUserInput] = useState({
        usernameLogin: 'admin',
        passwordLogin: 'admin'
    });

    const [userRegistration, setUserRegistration] = useState({
        usernameRegistration: '',
        emailRegistration: '',
        passwordRegistration: '',
        confirmPassword: ''
    });

    const handleChangeInput = e => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value })
    }

    const handleChangeRegistration = e => {
        setUserRegistration({ ...userRegistration, [e.target.id]: e.target.value });
    }

    const loginCheck = useRef(null);
    const loginForm = useRef(null);
    const signupForm = useRef(null);
    const titleRef = useRef(null);

    const showLogin = () => {
        loginCheck.current.checked = true;
        loginForm.current.className = 'login';
        titleRef.current.className = 'title login';
    }

    const showSignup = () => {
        signupForm.current.checked = true;
        loginForm.current.className = 'login loginHide';
        titleRef.current.className = 'title login loginHide';
    }

    const { usernameLogin, passwordLogin } = userInput;
    const { usernameRegistration, emailRegistration, passwordRegistration, confirmPassword } = userRegistration;

    const disableLogin = usernameLogin === '' || passwordLogin === '' ? true : false;
    const disableSignup = emailRegistration === '' || passwordRegistration === '' || confirmPassword !== passwordRegistration ? true : false;
    const passwordNotEqual = passwordRegistration !== confirmPassword ? true : false;

    const login = e => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_URL + '/login', { usernameLogin: userInput.usernameLogin, passwordLogin: userInput.passwordLogin })
            .then(response => {
                if (response.data.message) {
                    alert(response.data.message);
                } else {
                    dispatch(userInfo(response.data));
                    console.log(response.data.id);
                    getData(response.data.id);
                    history.push('/');
                }
            })
    }

    const getData = (id_user) => {
        axios.get(process.env.REACT_APP_API_URL + '/customers/' + id_user)
            .then(res => res.data.forEach(cust => dispatch(customerAdd(cust))))
            .catch(err => alert(err));

        axios.get(process.env.REACT_APP_API_URL + '/transactions/' + id_user)
            .then(res => res.data.forEach(trans => dispatch(transactionAdd(trans))))
            .catch(err => alert(err));
        // axios.get(process.env.REACT_APP_API_URL + '/transactions/' + id_user)
        //     .then(res => console.log(res.data))
        //     .catch(err => alert(err));
    }

    const register = e => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_URL + '/register', userRegistration)
            .then(response => dispatch(userInfo(response.data)))
            .catch((error) => alert('Une erreur est survenue. ' + error));
    }


    return (
        <div>
            <div className="modal-body">

                <form action="#" id="loginForm" ref={loginForm}>
                    <div className="field">
                        <input type="text" id='usernameLogin' onChange={handleChangeInput} value={usernameLogin} placeholder="Pseudo" required />
                    </div>
                    <div className="field">
                        <input type="password" id='passwordLogin' onChange={handleChangeInput} value={passwordLogin} placeholder="Mot de passe" required />
                    </div>
                    <div className="pass-link"><p>Mot de passe oublié ?</p></div>
                    <div className="field">
                        <input type="submit" onClick={login} value="Connexion" disabled={disableLogin} />
                    </div>
                    <div className="signup-link">Pas encore membre ? <p onClick={showSignup}>S'enregistrer</p></div>
                </form>

                <form action="#" className="signupForm">
                    <div className="field">
                        <input type="text" id='usernameRegistration' placeholder="Pseudo" onChange={handleChangeRegistration} value={usernameRegistration} required />
                    </div>
                    <div className="field">
                        <input type="text" id='emailRegistration' placeholder="Adresse e-mail" onChange={handleChangeRegistration} value={emailRegistration} required />
                    </div>
                    <div className="field">
                        <input type="password" id='passwordRegistration' placeholder="Mot de passe" onChange={handleChangeRegistration} value={passwordRegistration} required />
                    </div>
                    <div className="field">
                        <input type="password" id='confirmPassword' placeholder="Confirmer mot de passe" onChange={handleChangeRegistration} value={confirmPassword} required />
                        {passwordNotEqual &&
                            <p>Mot de passe différent</p>
                        }
                    </div>
                    <div className="field">
                        <input type="submit" onClick={register} value="S'inscrire" disabled={disableSignup} />
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Login;