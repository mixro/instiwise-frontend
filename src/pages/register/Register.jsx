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
    const [passError, setPassError] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isFetching } = useSelector((state) => state.user);

    const handleClick = (e) =>  {
        e.preventDefault();

        if(password !== verifiedPassword) {
            setPassError(true);
        } else {
            userRegister(dispatch, {username, password, email}, navigate);
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
                    </div>
                    <div className="registerBody_item smallPaddingButton">
                        <h3>Email</h3>
                        <input 
                            className="login_right_item_input" 
                            type="text" 
                            placeholder='Email' 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="registerBody_item smallPaddingButton">
                        <h3>Password</h3>
                        <input 
                            className="login_right_item_input" 
                            type="password" 
                            placeholder='Password' 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="registerBody_item smallPaddingButton">
                        <h3>Verify Password</h3>
                        <input 
                            className="login_right_item_input" 
                            type="password" 
                            placeholder='Password' 
                            onChange={(e) => setVerifiedPassword(e.target.value)}
                        />
                    </div>
                </div>
                {passError && 
                    <div className="error">
                        <p>Passwords do not match, Repeat</p>
                    </div>
                }
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