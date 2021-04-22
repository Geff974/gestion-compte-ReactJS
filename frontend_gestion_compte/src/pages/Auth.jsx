import React, { useRef, useState } from 'react';
import { FaEnvelope, FaExternalLinkAlt, FaLinkedinIn, FaLock, FaRegEnvelope, FaUser, FaWhatsapp } from 'react-icons/fa';
import signinlogo from '../styles/img/sign-in-logo.png';
import signuplogo from '../styles/img/sign-up-logo.png';
import '../styles/Auth.css';

const Auth = () => {

    const signInBtn = useRef(null);
    const signUpBtn = useRef(null);
    const authContainer = useRef(null);

    const [signUpMode, setSignUpMode] = useState('')

    const showSignup = () => {
        setSignUpMode('sign-up-mode');
    };

    const showLogin = () => {
        setSignUpMode('');
    }


    return (
        <div className={'auth-container ' + signUpMode} ref={authContainer}>


            <div className="form-container">
                <div className="signin-signup">

                    <form action="#" className="sign-in-form">
                        <h2 className="title">Se connecter</h2>
                        <div className="input-field">
                            <i> <FaUser /> </i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <i> <FaLock /> </i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <input type="submit" value="Login" className="sign-btn solid" />

                        <p className="social-text">Contactez-moi sur mes réseaux</p>
                        <div className="social-media">
                            <a href="#" className="social-icon"> <FaRegEnvelope /> </a>
                            <a href="#" className="social-icon"> <FaWhatsapp /> </a>
                            <a href="#" className="social-icon"> <FaLinkedinIn /> </a>
                            <a href="#" className="social-icon"> <FaExternalLinkAlt /> </a>
                        </div>
                    </form>


                    <form action="#" className="sign-up-form">
                        <h2 className="title">S'inscrire</h2>
                        <div className="input-field">
                            <i> <FaUser /> </i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <i> <FaEnvelope /> </i>
                            <input type="text" placeholder="Email" />
                        </div>
                        <div className="input-field">
                            <i> <FaLock /> </i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <input type="submit" value="Login" className="sign-btn solid" />

                        <p className="social-text">Contactez-moi sur mes réseaux social professionnel</p>
                        <div className="social-media">
                            <a href="#" className="social-icon"> <FaRegEnvelope /> </a>
                            <a href="#" className="social-icon"> <FaWhatsapp /> </a>
                            <a href="#" className="social-icon"> <FaLinkedinIn /> </a>
                            <a href="#" className="social-icon"> <FaExternalLinkAlt /> </a>
                        </div>
                    </form>

                </div>
            </div>



            <div className="panels-container">

                <div className="panel left-panel">
                    <div className="content">
                        <h3>Nouveau ici ?</h3>
                        <p>N'hesitez pas, créer votre compte <span>gratuitement</span> maintenant.</p>
                        <button className="sign-btn transparent" ref={signUpBtn} onClick={showSignup}>S'inscrire</button>
                    </div>
                    <img src={signuplogo} className="image" alt="sign-up-logo" />
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3>Déja client(e) ?</h3>
                        <p>Connectez-vous maintenant.</p>
                        <button className="sign-btn transparent" ref={signInBtn} onClick={showLogin}>Se connecter</button>
                    </div>
                    <img src={signinlogo} className="image" alt="sign-in-logo" />
                </div>
            </div>




        </div>
    );
};

// #2271ff

export default Auth;