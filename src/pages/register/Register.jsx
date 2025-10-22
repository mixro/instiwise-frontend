import React, { useEffect, useState } from 'react';
import "./register.css";
import { Link, useNavigate } from 'react-router-dom';
import { fetchUsernames, googleRegister, userRegister } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { Cancel, CheckCircle } from '@mui/icons-material';

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [buttonClicked, setButtonClicked] = useState(false);
    const [googleButtonClicked, setGoogleButtonClicked] = useState(false);
    const [verifiedPassword, setVerifiedPassword] = useState("");
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
    const existingUsernames = useSelector((state) => state.usernames.usernames);

    // Add state to track input validity
    const [usernameValid, setUsernameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [verifiedPasswordValid, setVerifiedPasswordValid] = useState(true);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isFetching } = useSelector((state) => state.user);

    
    useEffect(() => {
        fetchUsernames(dispatch);
    }, [dispatch]);

    const handleChangeUsername = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        const isUsernameValid = newUsername.length >= 4;
        setUsernameValid(isUsernameValid);

    
        // Normalize the case for comparison
        const newUsernameNormalized = newUsername.replace(/\s+/g, '').toLowerCase();

        const existingUsernamesNormalized = existingUsernames.map(username => username.replace(/\s+/g, '').toLowerCase());

        if (existingUsernamesNormalized.includes(newUsernameNormalized)) {
            setIsUsernameAvailable(false);
        } else {
            setIsUsernameAvailable(true);
        }
    };         

    const handleClick = (e) =>  {
        e.preventDefault();

        // Validate input fields
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation
        const isPasswordValid = password.length >= 6; // Add your password validation logic
        const isVerifiedPasswordValid = password === verifiedPassword;

        // Update input validity state
        setEmailValid(isEmailValid);
        setPasswordValid(isPasswordValid);
        setVerifiedPasswordValid(isVerifiedPasswordValid);

        // Check if all input fields are valid before proceeding
        if (usernameValid && isEmailValid && isPasswordValid && isVerifiedPasswordValid && isUsernameAvailable) {
            setButtonClicked(true);
            userRegister(dispatch, { username, password, email }, navigate);
        }
    }

    const handleGoogleAuth = (details) => {
        const email = details.email;
        const username = details.name;
        const img = details.picture;

        setGoogleButtonClicked(true);
        googleRegister(dispatch, { username, email, img }, navigate);
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
                    <div className="registerBody_item smallPaddingButton no_PaddingBottom">
                        <h3>Username</h3>
                        <input 
                            className="login_right_item_input" 
                            type="text" 
                            placeholder='Username' 
                            onChange={handleChangeUsername}
                        />
                    </div>
                    {username && 
                        <div className="userProfile_UpdateUsernames">
                            {usernameValid && isUsernameAvailable ? <p>Username available</p> : <p style={{color: "red"}}>Username not available</p>}
                            <div className="usernameComparison-Icon">
                                {usernameValid && isUsernameAvailable ? <CheckCircle sx={{color: "green", fontSize: 18}} /> : <Cancel sx={{color: "red", fontSize: 18}} />}
                            </div>
                        </div>
                    }
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
                    <button onClick={handleClick} style={{cursor: !isUsernameAvailable ? "not-allowed" : "pointer"}}>{buttonClicked && isFetching ? "Loading.." : "Register"}</button>
                    {buttonClicked && error && 
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
                    {googleButtonClicked && error && 
                        <div className="error">
                            <p>Error while registering, Try again !!</p>
                        </div>
                    }
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
        {googleButtonClicked && !error && isFetching &&
             <div className="register_loader">
                <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        }
    </div>
  )
}

export default Register