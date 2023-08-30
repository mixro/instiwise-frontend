import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Google } from '@mui/icons-material';
import { googleLogin, login } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
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
         
        googleLogin(dispatch, {username, email}, navigate);
    }


  return (
    <div className="registerContainer">
        <div className="registerTop">
            <div className="registerTop_item">
                <h1 className='LARGESCREEN'>WELCOME TO INSTiWISE</h1>
                <h1 className='SMALLSCREEN'>INSTiWISE</h1>
            </div>
        </div>
        <div className="registerBody">
            <div className="registerBody_left">
                <img src='/assets/institute.jpeg' alt='INSTIWISE' />                
            </div>

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
                    <div className="registerBody_item">
                        <h3>Login with</h3>
                        <div className="authComp">
                            <div className="authComp_item">
                                <Google />
                            </div>
                            <div className="authComp_item red">
                                <Facebook />
                            </div>
                        </div>
                    </div>
                    <div className="registerButton highMargin">
                        <GoogleOAuthProvider clientId="870325701611-71prlkdqkh3ufs268scgvj9c53v1svn1.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    const details= jwt_decode(credentialResponse.credential);
                                    
                                    handleGoogleAuth(details);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </GoogleOAuthProvider>
                        <button onClick={handleClick}>{isFetching ? "Loading.." : "login"}</button>
                    </div>
                    {error && 
                        <div className="error">
                            <p>Wrong credentials!!, Try again !!</p>
                        </div>
                    }
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