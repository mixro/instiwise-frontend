import React, { useState } from 'react';
import "./register.css";
import { Link, useNavigate } from 'react-router-dom';
import { googleLogin, userRegister } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifiedPassword, setVerifiedPassword] = useState("");
    const [email, setEmail] = useState("");

    // Add state to track input validity
    const [usernameValid, setUsernameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [verifiedPasswordValid, setVerifiedPasswordValid] = useState(true);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isFetching } = useSelector((state) => state.user);

    const handleClick = (e) =>  {
        e.preventDefault();

        // Validate input fields
        const isUsernameValid = username.length >= 3; // Add your username validation logic
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation
        const isPasswordValid = password.length >= 6; // Add your password validation logic
        const isVerifiedPasswordValid = password === verifiedPassword;

        // Update input validity state
        setUsernameValid(isUsernameValid);
        setEmailValid(isEmailValid);
        setPasswordValid(isPasswordValid);
        setVerifiedPasswordValid(isVerifiedPasswordValid);

        // Check if all input fields are valid before proceeding
        if (isUsernameValid && isEmailValid && isPasswordValid && isVerifiedPasswordValid) {
            userRegister(dispatch, { username, password, email }, navigate);
        }
    }

    const handleGoogleAuth = (details) => {
        const email = details.email;
        const username = details.name;
        const img = details.picture;

        googleLogin(dispatch, { username, email, img }, navigate);
    }   


  return (
    <div className="registerContainer">
        <div className="registerTop">
            <div className="registerTop_item">
                <div className="registerTop_Image">
                    <img src="/assets/register.png" className='registerImage_Logo' alt='PR' />
                    <p className="LARGESCREEN">INSTiWISE</p>
                </div>
            </div>
        </div>
        <div className="registerBody">
            <div className="registerBody_right">
                <h1>REGISTER</h1>
                <div className="registerItems">
                    <div className="registerBody_item smallPaddingButton">
                        <h3>Username</h3>
                        <input 
                            className="login_right_item_input" 
                            type="text" 
                            placeholder='Username' 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {!usernameValid && <p className="error">Username is too short.</p>}
                    </div>
                    <div className="registerBody_item smallPaddingButton">
                        <h3>Email</h3>
                        <input 
                            className="login_right_item_input" 
                            type="text" 
                            placeholder='Email' 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {!emailValid && <p className="error">Invalid email format.</p>}
                    </div>
                    <div className="registerBody_item smallPaddingButton">
                        <h3>Password</h3>
                        <input 
                            className="login_right_item_input" 
                            type="password" 
                            placeholder='Password' 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {!passwordValid && <p className="error">Password is too short.</p>}
                    </div>
                    <div className="registerBody_item smallPaddingButton">
                        <h3>Verify Password</h3>
                        <input 
                            className="login_right_item_input" 
                            type="password" 
                            placeholder='Password' 
                            onChange={(e) => setVerifiedPassword(e.target.value)}
                        />
                        {!verifiedPasswordValid && <p className="error">Passwords do not match.</p>}
                    </div>
                </div>
                <div className="registerButton googleAuth smallButtonPading">
                    <button onClick={handleClick}>{isFetching ? "Loading.." : "Register"}</button>
                    {error && 
                        <div className="error">
                            <p>Error while registering, Try again !!</p>
                        </div>
                    }
                    <div className="registerOr">
                        <p>OR</p>
                    </div>
                    <div className="GoogleLogin_Special">
                        <GoogleLogin id="google" className="google_button"
                            onSuccess={credentialResponse => {
                                const details= jwt_decode(credentialResponse.credential);
                                handleGoogleAuth(details);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            shape='square'
                            text='signup_with'
                            type='standard'
                        />
                    </div>
                </div>
                <div className="registerText">
                    <p>Already a member? 
                        <Link to="/login" className='link-main'>
                            <span> Login</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register