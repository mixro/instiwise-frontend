import React, { useState } from 'react';
import "./register.css";
import { Link, useNavigate } from 'react-router-dom';
import { userRegister } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';

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

            <div className="registerBody_right">
                <h1>REGISTER</h1>
                <div className="registerItems">
                    <div className="registerBody_item">
                        <h3>Username</h3>
                        <input 
                            className="login_right_item_input" 
                            type="text" 
                            placeholder='Username' 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="registerBody_item">
                        <h3>Email</h3>
                        <input 
                            className="login_right_item_input" 
                            type="text" 
                            placeholder='Email' 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="registerBody_item">
                        <h3>Password</h3>
                        <input 
                            className="login_right_item_input" 
                            type="password" 
                            placeholder='Password' 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="registerBody_item">
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
                <div className="registerButton">
                    <button onClick={handleClick}>{isFetching ? "Loading.." : "Register"}</button>
                </div>
                {error && 
                    <div className="error">
                        <p>Error occured when trying to login, try again !!</p>
                    </div>
                }
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