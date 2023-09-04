import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogin, login } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const Login = () => {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate();
    const { isFetching, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
  
    const handleClick = (e) => {
      e.preventDefault();
      login(dispatch, { email, password }, navigate);
    }

    const handleGoogleAuth = (details) => {
        const email = details.email;
        const username = details.name;
        const img = details.picture;
         
        googleLogin(dispatch, {username, email, img}, navigate);
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
            <div className="registerBody_right spaceRound marginBottom">
                <h1>LOGIN</h1>
                <div className="loginBody">
                    <div className="registerItems">
                        <div className="registerBody_item">
                            <h3>Email</h3>
                            <input 
                                className="login_right_item_input" 
                                type="text" 
                                placeholder='johndoe32@gmail.com' 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="registerBody_item">
                            <h3>Password</h3>
                            <input 
                                className="login_right_item_input" 
                                type="password" 
                                placeholder='password' 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="registerButton highMargin googleAuth">
                        <button onClick={handleClick}>{isFetching ? "Loading.." : "login"}</button>
                        {error && 
                            <div className="error">
                                <p>Wrong credentials!!, Try again !!</p>
                            </div>
                        }
                        <div className="registerhighPadding">
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
                                text='signin'
                                type='standard'
                            />
                        </div>
                    </div>
                    <div className="registerText">
                        <p>You're new member? 
                            <Link to="/register" className='link-main'>
                                <span> Register</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login