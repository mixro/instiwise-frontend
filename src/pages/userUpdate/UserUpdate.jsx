import { useDispatch, useSelector } from 'react-redux';
import './userUpdate.css';
import { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import firebaseApp from '../../firebase';
import { deleteUser, fetchUsernames, updateUser } from '../../redux/apiCalls';
import { Cancel, CheckCircle } from '@mui/icons-material';

const UserUpdate = () => {
    const [buttonClicked, setButtonClicked] = useState(false);
    const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
    const [inputs, setInputs] = useState({});
    const [cover, setCover] = useState(null);
    const [coverPerc, setCoverPerc] = useState(0);
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicturePerc, setProfilePicturePerc] = useState(0);
    const user = useSelector((state) => state.user.currentUser);
    const [updatedUsername, setUpdatedUsername] = useState(user.username);
    const [usernameValid, setUsernameValid] = useState(true);
    const [isChanging, setIsChanging] = useState(false);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);
    const existingUsernames = useSelector((state) => state.usernames.usernames);
    const userId = user?._id;

    useEffect(() => {
        fetchUsernames(dispatch);
    }, [dispatch]);

    const handleChange = (e) => {
        setInputs((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleClick = (e) => {
        e.preventDefault();

        // Create an object to accumulate changes
        const updatedFields = {};

        if (cover !== null) {
            const coverName = new Date().getTime() + cover.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, coverName);
            const uploadTask = uploadBytesResumable(storageRef, cover);
        
            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setCoverPerc(progress);
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                        break;
                        case 'running':
                            console.log('Upload is running');
                        break;
                        default:
                            console.log("Upload is in progress");
                    }
                    }, 
                    (error) => {
                    }, 
                    () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const user = {...inputs, cover: downloadURL};
                        const id = userId;
                        updateUser(id, dispatch, user);
                    });
                }
            )
        }

        if (profilePicture !== null) {
            const profilePictureName = new Date().getTime() + profilePicture.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, profilePictureName);
            const uploadTask = uploadBytesResumable(storageRef, profilePicture);
        
            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setProfilePicturePerc(progress);
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                        break;
                        case 'running':
                            console.log('Upload is running');
                        break;
                        default:
                            console.log("Upload is in progress");
                    }
                    }, 
                    (error) => {
                    }, 
                    () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const user = {...inputs, img: downloadURL};
                        const id = userId;
                        updateUser(id, dispatch, user);
                        setButtonClicked(true);
                    });
                }
            )
        }

        if (updatedUsername !== null) {
            // If updatedUsername is not null, update the 'username' field in updatedFields
            updatedFields.username = updatedUsername;
        }

        // Check if any updates were made
        if (Object.keys(updatedFields).length > 0) {
            // Combine all updates into a single user object
            const updatedUser = { ...inputs, ...updatedFields };

            // Update the user with the accumulated changes
            updateUser(userId, dispatch, updatedUser);
        } else {
            // No updates were made, just update with the existing 'inputs'
            setButtonClicked(true);
            updateUser(userId, dispatch, inputs);
        }
    };
    
    const handleChangeUsername = (e) => {
        const newUsername = e.target.value;
        setIsChanging(true);
        setUpdatedUsername(newUsername);
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


    const handleDelete = (e) => {
        e.preventDefault();
        const id = userId;
        deleteUser(id, dispatch);
        setDeleteButtonClicked(true);
    }

  return (
    <div className="userUpdate_Container">
        <div className="userUpdate_Wrapper">
            <h2>Update Your Info</h2>

            <div className="userUpdate_Body">
                <div className="userUpdate_Item">
                    <p>Username</p>
                    <input 
                        type="text"
                        name="username"
                        placeholder={user?.username}
                        className="userUpdateInput"
                        onChange={handleChangeUsername}
                    />
                </div>
                {isChanging && updatedUsername && 
                    <div className="userProfile_UpdateUsernames">
                        {usernameValid && isUsernameAvailable ? <p>Username available</p> : <p style={{color: "red"}}>Username not available</p>}
                        <div className="usernameComparison-Icon">
                            {usernameValid && isUsernameAvailable ? <CheckCircle sx={{color: "green", fontSize: 18}} /> : <Cancel sx={{color: "red", fontSize: 18}} />}
                        </div>
                    </div>
                }
                <div className="userUpdate_Item">
                    <p>Bio</p>
                    <input 
                        type="text"
                        placeholder={user?.bio || "this is my biography"}
                        className="userUpdateInput"
                        onChange={handleChange}
                        name="bio"
                    />
                </div>
                <div className="userUpdate_Item">
                    <p>Password</p>
                    <input 
                        type="password"
                        name="password"
                        placeholder="password"
                        className="userUpdateInput"
                        onChange={handleChange}
                    />
                </div>
                <div className="userUpdate_Item">
                    <p>Course</p>
                    <input 
                        type="text"
                        name="course"
                        placeholder={user?.course || "eg. electrical"}
                        className="userUpdateInput"
                        onChange={handleChange}
                    />
                </div>
                <div className="userUpdate_Item">
                    <p>Email</p>
                    <input 
                        type="text"
                        placeholder={user?.email || "eg. john@gmail.com"}
                        className="userUpdateInput"
                        onChange={handleChange}
                        name="email"
                    />
                </div>
                <div className="userUpdate_Item">
                    <p>Phone</p>
                    <input 
                        type="text"
                        placeholder={user?.phoneNumber || "eg. +2556 986 778 999"}
                        onChange={handleChange}
                        name="phoneNumber"
                        className="userUpdateInput"
                    />
                </div>
                <div className="userUpdate_Item">
                    <p>Profile picture</p>
                    <input type='file' id='profile-picture' accept='.jpeg, .jpg, .png' onChange={(e) => setProfilePicture(e.target.files[0])} style={{ display: "none" }} placeholder='cover' />
                    <label htmlFor="profile-picture">
                        <div className="Profile_UploadButton Profile_UploadButtons">
                            <span>{profilePicturePerc > 0 && profilePicturePerc <100 ? "UPLOADING..." : "UPLOAD PROFILE PICTURE"}</span>
                        </div>
                    </label>
                </div>
                <div className="userUpdate_Item">
                    <p>Profile cover</p>
                    <input type='file' id='profile-cover' accept='.jpeg, .jpg, .png' onChange={(e) => setCover(e.target.files[0])}  style={{ display: "none" }} placeholder='cover' />
                    <label htmlFor="profile-cover">
                        <div className="Profile_UploadButton Profile_UploadButtons">
                            <span>{coverPerc > 0 && coverPerc <100 ? "UPLOADING..." : "UPLOAD COVER"}</span>
                        </div>
                    </label>
                </div>
                <div className="userUpdate_Item">
                    <p>Gender</p>
                    <select onChange={handleChange} className="newUserSelect" name="gender" id="active">
                        <option value="male">male</option>
                        <option value="female">female</option>
                        <option value="female">others</option>
                    </select>
                </div>
                <div className={(coverPerc > 0 && coverPerc < 100) || (profilePicturePerc > 0 && profilePicturePerc < 100) ? "userUpdate_UpdatingButton" : "userUpdate_Button"}>
                    <button 
                        onClick={handleClick} 
                        style={{cursor: !isUsernameAvailable ? "not-allowed" : "pointer"}}
                    >
                        {isFetching && buttonClicked ? "UPDATING..." : "UPDATE"}
                    </button>
                    {buttonClicked && error && <p style={{color: "red"}}>error occurred</p>}
                </div>
            </div>
        </div>
        <div className="Profile_LogoutPart UserUpdate_Profile">
            <h1 className="userTitle">DELETE ACCOUNT</h1>
            <div className="logout">
                <div className="logoutButton">
                    <button onClick={handleDelete}>{isFetching && deleteButtonClicked ? "Deleting..." : "Delete Account"}</button>
                </div>
                 {deleteButtonClicked && error && <p style={{color: "red"}}>error occurred while deleting, try again!!</p>}
            </div>
            <p className='logoutWarning'>*If you delete account, Your data will not be retrevied!</p>
        </div>
    </div>
  )
}

export default UserUpdate