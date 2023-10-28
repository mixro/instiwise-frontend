import { useState } from 'react';
import './password.css';
import { useDispatch, useSelector } from 'react-redux';
import { userRequest } from '../../requestMethod';
import { updateUser } from '../../redux/apiCalls';

const Password = () => {
    const user = useSelector((state) => state.user.currentUser);
    const userId = user?._id;
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifiedPassword, setVerifiedPassword] = useState("");
    const [buttonClicked, setButtonClicked] = useState(false);    

    const [passwordValid, setPasswordValid] = useState(true);
    const [verifiedPasswordValid, setVerifiedPasswordValid] = useState(true);
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const response = await userRequest.post(`/auth/update-password/${userId}`, {oldPassword: oldPassword});
        
            if(response.status === 200){
                setIsPasswordMatch(true);
                console.log('true')
            } else {
                setIsPasswordMatch(false);
                console.log("false")
            }             
            
            const isPasswordValid = newPassword.length >= 6;
            const isVerifiedPasswordValid = newPassword === verifiedPassword;

            setPasswordValid(isPasswordValid);
            setVerifiedPasswordValid(isVerifiedPasswordValid);

            if ( passwordValid && verifiedPasswordValid && isPasswordMatch ) {
                setButtonClicked(true);                
                const user = {password: newPassword}
                updateUser(userId, dispatch, user);
            }            
        } catch(err) {
            console.log("Request failed:", err);
        }
    }


  return (
    <div className="passwordContainer">
        <div className="password_Wrapper">
            <div className="passwordBody">
                <div className="paswword_Item">
                    <p>Old password</p>
                    <input 
                        type='text' 
                        placeholder='Enter old password' 
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    {!isPasswordMatch && <span>Password do not match !!</span>}
                </div>
                <div className="paswword_Item">
                    <p>New password</p>
                    <input 
                        type='text' 
                        placeholder='New password' 
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {!passwordValid && <span>Password is too short !!</span>}
                </div>
                <div className="paswword_Item">
                    <p>Verify new password</p>
                    <input 
                        type='text' 
                        placeholder='VerIfy password' 
                        onChange={(e) => setVerifiedPassword(e.target.value)}
                    />
                    {!verifiedPasswordValid && <span>Password you entered do not match</span>}
                </div>

                <div onClick={handleClick} className="pasowrdUpdate_Button">
                    <button>{buttonClicked && isFetching ? "UPDATING..." : "UPDATE"}</button>
                </div>
                {buttonClicked && passwordValid && verifiedPasswordValid && isPasswordMatch && !error && 
                    <div className="succesfully">
                        <p>Succesfully, updated !!</p>
                    </div>
                }
                {buttonClicked && (!passwordValid || !verifiedPasswordValid || !isPasswordMatch || error) && 
                    <div className="error">
                        <p>Error while updating, Try again !!</p>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default Password