import { useEffect, useState } from 'react';
import './setUsername.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsernames, updateUsername } from '../../redux/apiCalls';
import { Cancel, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SetUsername = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [currentTime, setCurrentTime] = useState('');
    const [usernameValid, setUsernameValid] = useState(true);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
    const [buttonClicked, setButtonClicked] = useState(false);
    const user = useSelector((state) => state.user.currentUser);
    const userId = user?._id;
    const { isFetching, error } = useSelector((state) => state.user);
    const existingUsernames = useSelector((state) => state.usernames.usernames);
    

    useEffect(() => {
        fetchUsernames(dispatch);
    }, [dispatch]);


    useEffect(() => {
        const getCurrentInfo = () => {
          const now = new Date();
          const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        
          setCurrentTime(time);
        };    
    
        const interval = setInterval(getCurrentInfo, 1000);
        getCurrentInfo();
    
        return () => clearInterval(interval);
    }, []); 
    
    const handleChangeUsername = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        const isUsernameValid = newUsername.length > 3 && newUsername.length < 30;
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

    const handleUpdate = (e) => {
        e.preventDefault();

        setButtonClicked(true);
        const id = userId;
        const user = { username: username };
        if (usernameValid && isUsernameAvailable ) {
            updateUsername(id, dispatch, user, navigate);
        }
    }

  return (
    <div className="setUsername">
        <div className="setUsername_wrapper">
            <div className="setUsername_top">
                <h2>INSTiWISE</h2>
                <h2>{currentTime}</h2>
            </div>
            <div className="setUsername_Body">
                <div className="setUsername_BodyTitle">
                    <p>Set username</p>
                </div>
                <input 
                    type="text" 
                    placeholder='set username' 
                    onChange={handleChangeUsername}
                />
                <div className="setUsername_Availability">
                    {username && 
                        <div className="userProfile_UpdateUsernames setUsername_Fonts">
                            {usernameValid && isUsernameAvailable ? <p>Username available</p> : <p style={{color: "red"}}>Username not available</p>}
                            <div className="usernameComparison-Icon">
                                {usernameValid && isUsernameAvailable ? <CheckCircle sx={{color: "green", fontSize: 22}} /> : <Cancel sx={{color: "red", fontSize: 22}} />}
                            </div>
                        </div>
                    }
                </div>
                <div className="setUsername_Rules">
                    <p>Username must consist of a minimum of 4 characters and maximum of 30 characters</p>
                </div>
                <div className="setUsername_Button">
                    <button onClick={handleUpdate} style={{cursor: usernameValid && isUsernameAvailable ? "pointer" : "not-allowed"}}>{buttonClicked && isFetching ? "SETTING USERNAME..." : "SET USERNAME"}</button>
                </div>
                {buttonClicked && error && <p style={{color: "red"}}>error occurred, try again!!</p>}
            </div>
            <div className="setUsername_Bottom">
                <p>INSTiWISE | Seamless Scheduling</p>
            </div>
        </div>
    </div>
  )
}

export default SetUsername